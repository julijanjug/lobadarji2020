import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
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
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);


  const freeDraw = new FreeDraw({
      mode: FreeDraw.ALL,
      smoothFactor: 0.7,
      simplifyFactor: 1.5,
      strokeWidth: 3
  });

  this.map.addLayer(freeDraw);

  freeDraw.on('markers', event => {
      console.log(event.latLngs);
  });

  }

}
