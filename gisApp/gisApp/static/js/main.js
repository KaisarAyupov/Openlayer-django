var mapView = new ol.View({
    center: ol.proj.fromLonLat([78.776032, 43.766398]),
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

var WmbPolTile = new ol.layer.Tile({
    title: "VXB",
    source: new ol.source.TileWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:wmb_polygon', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

map.addLayer(WmbPolTile);