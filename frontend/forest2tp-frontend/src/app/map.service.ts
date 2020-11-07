import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../environments/environment";
import * as mbdraw from "@mapbox/mapbox-gl-draw";

@Injectable({
providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = 46.0569;
  lng = 14.5058;
  zoom = 11.5;


  constructor() {
    +  Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })
    this.map.addControl(new mapboxgl.NavigationControl());

    var draw = new mbdraw.MapboxDraw({
      displayControlsDefault: false,
      controls: {
      polygon: true,
      trash: true
      }
      });
      this.map.addControl(draw);
       
      this.map.on('draw.create', updateArea);
      this.map.on('draw.delete', updateArea);
      this.map.on('draw.update', updateArea);
  }

  
     
    function updateArea(e) {
    var data = draw.getAll();
    var answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
    var area = turf.area(data);
    // restrict to area to 2 decimal points
    var rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML =
    '<p><strong>' +
    rounded_area +
    '</strong></p><p>square meters</p>';
    } else {
    answer.innerHTML = '';
    if (e.type !== 'draw.delete')
    alert('Use the draw tools to draw a polygon!');
    }
    }
}