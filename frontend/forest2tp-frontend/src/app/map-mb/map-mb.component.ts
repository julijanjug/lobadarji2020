import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from "../map.service";

@Component({
selector: 'app-map-mb',
templateUrl: './map-mb.component.html',
styleUrls: ['./map-mb.component.scss']
})
export class MapMbComponent implements OnInit {
  disabledContinueBtn = true;
constructor(
  private map: MapService,
  private router: Router
  ) { }
  ngOnInit() {
    this.map.buildMap();
    this.map.btnEnabled.subscribe(data => {this.disabledContinueBtn=data; console.log(data)});
  }

  async callPost(){
    var response = await this.map.postArea();
    console.log("2", response);
    await this.router.navigate(['tp-info']);
  }
}
