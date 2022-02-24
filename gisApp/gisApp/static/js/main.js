var mapView = new ol.View({
    center: ol.proj.fromLonLat([68.804138, 48.946857]),
    zoom: 5.5
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

var DistrictKZTile = new ol.layer.Tile({
    title: "VXB",
    source: new ol.source.TileWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:DistrictKZ_CH', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

map.addLayer(DistrictKZTile);
/* 
var WmbPolTile = new ol.layer.Tile({
    title: "VXB",
    source: new ol.source.TileWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:wmb_polygon', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

map.addLayer(WmbPolTile); */


