import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import FreeDraw, { DELETE, EDIT, NONE, CREATE } from 'leaflet-freedraw';
// import 'leaflet-easybutton';
// import  'leaflet-search';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


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
    this.initGoogleSearch();
  }

  private initMap(): void {
    //search box
    var searchLayer = L.geoJson();

    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      doubleClickZoom: false,
      searchControl: {layer: searchLayer}
    }).locate({setView: true, maxZoom: 13});

    //satelite imagery
    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);
    

    //add drawing functionality
    const freeDraw = new FreeDraw({
        mode: FreeDraw.ALL,
        smoothFactor: 0.7,
        simplifyFactor: 1.4,
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

  }

  async initGoogleSearch() {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
    });

    this.map.addControl(searchControl);
  }

  private setLocation(loc){
    this.map.panTo(new L.LatLng(loc.location.x, loc.location.y));
  }
}
