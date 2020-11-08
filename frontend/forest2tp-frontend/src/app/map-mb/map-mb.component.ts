import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";

@Component({
selector: 'app-map-mb',
templateUrl: './map-mb.component.html',
styleUrls: ['./map-mb.component.scss']
})
export class MapMbComponent implements OnInit {
  disabledContinueBtn = true;
constructor(
  private map: MapService
  ) { }
  ngOnInit() {
    this.map.buildMap();
    this.map.btnEnabled.subscribe(data => {this.disabledContinueBtn=data; console.log(data)});
  }

  callPost(){
    this.map.postArea();
  }
}
