var mapView = new ol.View({
    center: ol.proj.fromLonLat([68.804138, 48.946857]),
    zoom: 5.5
});

var map = new ol.Map({
    target: 'map',
    view: mapView
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
var baseGroup = new ol.layer.Group({
    title: 'Base Maps',
    fold: true,
    layers: [osmTile, noneTile]
});
map.addLayer(baseGroup);

var DistrictKZTile = new ol.layer.Tile({
    title: "DistrictKZ",
    source: new ol.source.TileWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:DistrictKZ_CH', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(DistrictKZTile);

var WmbPolTile = new ol.layer.Tile({
    title: "VXB",
    source: new ol.source.TileWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:wmb_polygon', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(WmbPolTile);

var overlayGroup = new ol.layer.Group({
    title: 'Overlays',
    fold: true,
    layers: [DistrictKZTile, WmbPolTile]
});

map.addLayer(overlayGroup);

