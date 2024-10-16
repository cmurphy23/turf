# @turf/dissolve

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## dissolve

Dissolves a FeatureCollection of [Polygon][1] features, filtered by an optional property name:value.
Note that [MultiPolygon][2] features within the collection are not supported

### Parameters

*   `fc` **[FeatureCollection][3]<[Polygon][1]>**&#x20;
*   `options` **[Object][4]** Optional parameters (optional, default `{}`)

    *   `options.propertyName` **[string][5]?** features with the same `propertyName` value will be dissolved.
*   `featureCollection` **[FeatureCollection][3]<[Polygon][1]>** input feature collection to be dissolved

### Examples

```javascript
var features = turf.featureCollection([
  turf.polygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], {combine: 'yes'}),
  turf.polygon([[[0, -1], [0, 0], [1, 0], [1, -1], [0,-1]]], {combine: 'yes'}),
  turf.polygon([[[1,-1],[1, 0], [2, 0], [2, -1], [1, -1]]], {combine: 'no'}),
]);

var dissolved = turf.dissolve(features, {propertyName: 'combine'});

//addToMap
var addToMap = [features, dissolved]
```

Returns **[FeatureCollection][3]<[Polygon][1]>** a FeatureCollection containing the dissolved polygons

[1]: https://tools.ietf.org/html/rfc7946#section-3.1.6

[2]: https://tools.ietf.org/html/rfc7946#section-3.1.7

[3]: https://tools.ietf.org/html/rfc7946#section-3.3

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- This file is automatically generated. Please don't edit it directly. If you find an error, edit the source file of the module in question (likely index.js or index.ts), and re-run "yarn docs" from the root of the turf project. -->

---

This module is part of the [Turfjs project](https://turfjs.org/), an open source module collection dedicated to geographic algorithms. It is maintained in the [Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create PRs and issues.

### Installation

Install this single module individually:

```sh
$ npm install @turf/dissolve
```

Or install the all-encompassing @turf/turf module that includes all modules as functions:

```sh
$ npm install @turf/turf
```
