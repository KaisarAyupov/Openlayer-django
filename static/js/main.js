var mapView = new ol.View({
    center: ol.proj.fromLonLat([78.776032, 23.766398]),
    zoom: 4.5
});

var map = new ol.Map({
    target: 'map',
    view: mapView
});



var osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM()
});



map.addLayer(osmTile);

