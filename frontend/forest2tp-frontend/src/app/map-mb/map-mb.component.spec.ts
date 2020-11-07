
import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
@Component({
selector: 'app-map',
templateUrl: './map-mb.component.html',
styleUrls: ['./map-mb.component.scss']
})
export class MapMbComponent implements OnInit {
constructor(private map: MapService) { }
  ngOnInit() {
    this.map.buildMap()
  }
};