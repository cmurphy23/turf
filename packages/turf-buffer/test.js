const fs = require('fs');
const test = require('tape');
const path = require('path');
const load = require('load-json-file');
const write = require('write-json-file');
const truncate = require('@turf/truncate');
const {featureEach} = require('@turf/meta');
const {featureCollection, point, polygon, geometryCollection} = require('@turf/helpers');
const buffer = require('./');

const directories = {
    in: path.join(__dirname, 'test', 'in') + path.sep,
    out: path.join(__dirname, 'test', 'out') + path.sep
};

let fixtures = fs.readdirSync(directories.in).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(directories.in + filename)
    };
});
// fixtures = fixtures.filter(({name}) => name === 'feature-collection-points');

test('turf-buffer', t => {
    for (const {filename, name, geojson} of fixtures) {
        let {radius, units, steps} = geojson.properties || {};
        radius = radius || 50;
        units = units || 'miles';

        const buffered = truncate(buffer(geojson, radius, units, steps));

        // Add Results to FeatureCollection
        const results = featureCollection([]);
        featureEach(buffered, feature => results.features.push(colorize(feature, '#F00')));
        featureEach(geojson, feature => results.features.push(colorize(feature, '#00F')));

        if (process.env.REGEN) write.sync(directories.out + filename, results);
        t.deepEqual(results, load.sync(directories.out + filename), name);
    }
    t.end();
});

// https://github.com/Turfjs/turf/pull/736
test('turf-buffer - Support Negative Buffer', t => {
    const poly = polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);

    t.assert(buffer(poly, -50), 'allow negative buffer param');
    t.end();
});

test('turf-buffer - Support Geometry Objects', t => {
    const pt = point([61, 5]);
    const poly = polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
    const gc = geometryCollection([pt.geometry, poly.geometry]);

    t.assert(buffer(gc, 10), 'support Geometry Collection');
    t.assert(buffer(pt.geometry, 10), 'support Point Geometry');
    t.assert(buffer(poly.geometry, 10), 'support Polygon Geometry');
    t.end();
});

test('turf-buffer - Prevent Input Mutation', t => {
    const pt = point([61, 5]);
    const poly = polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
    const collection = featureCollection([pt, poly]);

    const beforePt = JSON.parse(JSON.stringify(pt));
    const beforePoly = JSON.parse(JSON.stringify(poly));
    const beforeCollection = JSON.parse(JSON.stringify(collection));

    buffer(pt, 10);
    buffer(poly, 10);
    buffer(collection, 10);

    t.deepEqual(pt, beforePt, 'pt should not mutate');
    t.deepEqual(poly, beforePoly, 'poly should not mutate');
    t.deepEqual(collection, beforeCollection, 'collection should not mutate');
    t.end();
});

function colorize(feature, color = '#F00') {
    if (feature.properties) {
        feature.properties.stroke = color;
        feature.properties.fill = color;
        feature.properties['marker-color'] = color;
        feature.properties['fill-opacity'] = 0.3;
    }
    return feature;
}
