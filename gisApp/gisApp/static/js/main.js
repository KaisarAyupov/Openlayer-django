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
        visible: true,
        transition: 50,
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
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    groupSelectStyle: 'children'
});

map.addControl(layerSwitcher);

var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function (coordinate) { return ol.coordinate.format(coordinate, '{y} , {x}', 6); }
});
map.addControl(mousePosition);

var scaleControl = new ol.control.ScaleLine({
});
map.addControl(scaleControl);


map.on('singleclick', function (evt) {
    if (featureInfoFlag) {
        content.innerHTML = '';
        var resolution = mapView.getResolution();

        var url = IndiaDsTile.getSource().getFeatureInfoUrl(evt.coordinate, resolution, 'EPSG:3857', {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'state,district'
        });

        if (url) {
            $.getJSON(url, function (data) {
                var feature = data.features[0];
                var props = feature.properties;
                content.innerHTML = "<h3> State : </h3> <p>" + props.state.toUpperCase() + "</p> <br> <h3> District : </h3> <p>" +
                    props.district.toUpperCase() + "</p>";
                popup.setPosition(evt.coordinate);
            })
        } else {
            popup.setPosition(undefined);
        }
    }
});