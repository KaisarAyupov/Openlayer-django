var mapView = new ol.View({
    center: ol.proj.fromLonLat([78.776032, 23.766398]),
    zoom: 4.5
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
    controls: []
});

var noneTile = new ol.layer.Tile({
    title: 'None',
    type: 'base',
    visible: false
});

var osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    type: 'base',
    source: new ol.source.OSM()
});

// map.addLayer(osmTile);
