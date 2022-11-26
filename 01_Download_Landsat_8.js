// Exporting Landsat 8 Images

var roi = ee.Geometry.Rectangle([2.23, 48.77, 2.62, 48.89]);

// Load Landsat 8
var image = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filterDate('2017-01-01', '2017-12-31')
.filterBounds(roi)
.sort('CLOUD_COVER')
.first();

var visPaaramsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(image.clip(roi), visPaaramsTrue, 'Landsat 2017');
Map.centerObject(roi, 10);

// Export to Drive
Export.image.toDrive({
  image: image.int16(),
  description: 'Landsat2017Paris',
  scale: 30,
  region: roi,
  maxPixels: 1e13
});