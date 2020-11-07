import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import FreeDraw, { CREATE, EDIT, DELETE, NONE } from 'leaflet-freedraw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      doubleClickZoom: false
    }).locate({setView: true, maxZoom: 17});;

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
                icon:      '<img src="https://img.icons8.com/windows/32/000000/polygon.png"/>',               // and define its properties
                title:     'Define area',      // like its title
                onClick: function(btn, map) {       // and its callback
                  freeDraw.mode(CREATE | EDIT | DELETE);
                    btn.state('disable-add-polygon');    // change state on click!
                }
            }, {
                stateName: 'disable-add-polygon',
                icon:      '<img src="https://img.icons8.com/windows/32/000000/polygon.png"/>',
                title:     'Disable',
                onClick: function(btn, map) {
                    freeDraw.mode(NONE);
                    btn.state('enable-add-polygon');
                }
        }]
    });
    
    stateChangingButton.addTo(this.map);
  }
}
