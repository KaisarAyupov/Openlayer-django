var view = new ol.View({
    projection: 'EPSG:4326',
    center: [68.804138, 48.946857],
    zoom: 6,

});
var view_ov = new ol.View({
    projection: 'EPSG:4326',
    center: [68.804138, 48.946857],
    zoom: 6,
});


var base_maps = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
        new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        })
    ]
});

var OSM = new ol.layer.Tile({
    source: new ol.source.OSM(),
    type: 'base',
    title: 'OSM',
});

var overlays = new ol.layer.Group({
    'title': 'Overlays',
    layers: [
        new ol.layer.Image({
            title: 'DistrictKZ_CH',
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
                params: { 'LAYERS': 'geonode:DistrictKZ_CH' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Image({
            title: 'wmb_polygon',
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
                params: { 'LAYERS': 'geonode:wmb_polygon' },
                ratio: 1,
                serverType: 'geoserver'
            })
        })

    ]
});


var map = new ol.Map({
    target: 'map',
    view: view,
});

map.addLayer(base_maps);
map.addLayer(overlays);

var rainfall = new ol.layer.Image({
    title: 'Watersheds_of_Order_20',
    // extent: [-180, -90, -180, 90],
    source: new ol.source.ImageWMS({
        url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
        params: { 'LAYERS': 'geonode:Watersheds_of_Order_20' },
        ratio: 1,
        serverType: 'geoserver'
    })
});

overlays.getLayers().push(rainfall);
//map.addLayer(rainfall);

var mouse_position = new ol.control.MousePosition();
map.addControl(mouse_position);

var overview = new ol.control.OverviewMap({
    view: view_ov,
    collapseLabel: 'O',
    label: 'O',
    layers: [OSM]
});
map.addControl(overview);

var full_sc = new ol.control.FullScreen({ label: 'F' });
map.addControl(full_sc);

var zoom = new ol.control.Zoom({ zoomInLabel: '+', zoomOutLabel: '-' });
map.addControl(zoom);

var slider = new ol.control.ZoomSlider();
map.addControl(slider);



var zoom_ex = new ol.control.ZoomToExtent({
    extent: [
        65.90, 7.48,
        98.96, 40.30
    ]
});
map.addControl(zoom_ex);

var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    tipLabel: 'Layers', // Optional label for button
    groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: 'Collapse layers',
});
map.addControl(layerSwitcher);

function legend() {

    //	$('#legend').empty();

    var no_layers = overlays.getLayers().get('length');

    var head = document.createElement("h4");

    var txt = document.createTextNode("Legend");

    head.appendChild(txt);
    var element = document.getElementById("legend");
    element.appendChild(head);
    var ar = [];
    var i;
    for (i = 0; i < no_layers; i++) {
        ar.push("https://geoportal.ingeo.kz/geoserver/geonode/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + overlays.getLayers().item(i).get('title'));
        //alert(overlays.getLayers().item(i).get('title'));
    }
    for (i = 0; i < no_layers; i++) {
        var head = document.createElement("p");

        var txt = document.createTextNode(overlays.getLayers().item(i).get('title'));
        //alert(txt[i]);
        head.appendChild(txt);
        var element = document.getElementById("legend");
        element.appendChild(head);
        var img = new Image();
        img.src = ar[i];

        var src = document.getElementById("legend");
        src.appendChild(img);

    }

}

legend();