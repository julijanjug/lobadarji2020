import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import FreeDraw, { DELETE, EDIT, NONE, CREATE } from 'leaflet-freedraw';
import 'leaflet-easybutton';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  drawLayer;

  disabledContinueBtn = true;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      doubleClickZoom: false
    }).locate({setView: true, maxZoom: 13});;

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    //add drawing functionality
    const freeDraw = new FreeDraw({
        mode: FreeDraw.ALL,
        smoothFactor: 0.7,
        simplifyFactor: 1.5,
        strokeWidth: 3,
        maximumPolygons: 1
    });
    this.map.addLayer(freeDraw);

    freeDraw.on('markers', event => {
        console.log(event.latLngs);
    });

    //Toolbar for draw control
    var stateChangingButton = L.easyButton({
        states: [{
                stateName: 'enable-add-polygon',        // name the state
                icon:      '<i class="fas fa-draw-polygon"></i>',               // and define its properties
                title:     'Define area',      // like its title
                onClick: function(btn, map) {       // and its callback
                  freeDraw.mode(CREATE | EDIT | DELETE);
                    btn.state('disable-add-polygon');    // change state on click!
                }
            }, {
                stateName: 'disable-add-polygon',
                icon:      '<i class="fas fa-arrows-alt"></i>',
                title:     'Move',
                onClick: function(btn, map) {
                    freeDraw.mode(NONE);
                    btn.state('enable-add-polygon');
                }
        }]
    });
    stateChangingButton.addTo(this.map);

    var mapLink = '<a href="http://www.esri.com/">Esri</a>';
    var wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; '+mapLink+', '+wholink,
    maxZoom: 18,
    }).addTo(this.map);
  }
}
