(function () {
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Group({
        // A layer must have a title to appear in the layerswitcher
        title: 'Base maps',
        layers: [
          new ol.layer.Group({
            // A layer must have a title to appear in the layerswitcher
            title: 'Water color with labels',
            // Setting the layers type to 'base' results
            // in it having a radio button and only one
            // base layer being visibile at a time
            type: 'base',
            // Setting combine to true causes sub-layers to be hidden
            // in the layerswitcher, only the parent is shown
            combine: true,
            visible: false,
            layers: [
              new ol.layer.Tile({
                source: new ol.source.Stamen({
                  layer: 'watercolor'
                })
              }),
              new ol.layer.Tile({
                source: new ol.source.Stamen({
                  layer: 'terrain-labels'
                })
              })
            ]
          }),
          new ol.layer.Tile({
            // A layer must have a title to appear in the layerswitcher
            title: 'Water color',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            source: new ol.source.Stamen({
              layer: 'watercolor'
            })
          }),
          new ol.layer.Tile({
            // A layer must have a title to appear in the layerswitcher
            title: 'OSM',
            // Again set this layer as a base layer
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
          })
        ]
      }),
      new ol.layer.Group({
        // A layer must have a title to appear in the layerswitcher
        title: 'Overlays',
        // Adding a 'fold' property set to either 'open' or 'close' makes the group layer
        // collapsible
        fold: 'open',
        layers: [
          new ol.layer.Tile({
            title: "DistrictKZ",
            source: new ol.source.TileWMS({
              url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
              params: { 'LAYERS': 'geonode:DistrictKZ_CH', 'TILED': true },
              serverType: 'geoserver',
              visible: true
            })
          }),
          new ol.layer.Group({
            // A layer must have a title to appear in the layerswitcher
            title: 'Водные ресурсы',
            fold: 'open',
            layers: [
              new ol.layer.Tile({
                title: "Водохозяйственные бассейны",
                source: new ol.source.TileWMS({
                  url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
                  params: { 'LAYERS': 'geonode:wmb_polygon', 'TILED': true },
                  serverType: 'geoserver',
                  visible: true
                })
              }),
              new ol.layer.Tile({
                title: "Водосборные площади водотоков II-го порядка",
                source: new ol.source.TileWMS({
                  url: 'https://geoportal.ingeo.kz/geoserver/geonode/wms',
                  params: { 'LAYERS': 'geonode:Watersheds_of_Order_20', 'TILED': true },
                  serverType: 'geoserver',
                  visible: false
                })
              })
            ]
          })
        ]
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([68.804138, 48.946857], 'EPSG:4326', 'EPSG:3857'),
      zoom: 5.5
    })
  });
  var popup = new Popup();
  map.addOverlay(popup);

  map.on('singleclick', function (evt) {
    var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
  });


  var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    tipLabel: 'Show layer list', // Optional label for button
    collapseTipLabel: 'Hide layer list', // Optional label for button
    groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
  });
  map.addControl(layerSwitcher);
})();
