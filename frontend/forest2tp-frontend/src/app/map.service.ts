import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../environments/environment";
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import  axios from 'axios';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  draw: MapboxDraw;
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = 46.0569;
  lng = 14.5058;
  zoom = 11.5;
  btnEnabled = new BehaviorSubject(false);

  constructor() {
    +  Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    })
    this.map.addControl(new mapboxgl.NavigationControl());

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
      polygon: true,
      trash: true
      }
    });
      this.map.addControl(this.draw);
       
    // this.map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })
    // );

    // this.map.on('draw.delete', checkBtn);
    // this.map.on('draw.create', checkBtn);
    // this.map.on('draw.update', checkBtn);
      
    function checkBtn(e) {
      debugger
      var data = this.draw.getAll().features[0].geometry.coordinates[0];
      if (data.features.length > 0) {
        this.btnEnabled.next(true);
      }else {
        this.btnEnabled.next(false);
      }
    }
  } 
  
  postArea() {
      var data = this.draw.getAll();
      if (data.features.length > 0) {
        let locArray = data.features[0].geometry.coordinates[0];
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/sinergise',
          data: {
            polygons: locArray
          }
        });
      }
  }
}