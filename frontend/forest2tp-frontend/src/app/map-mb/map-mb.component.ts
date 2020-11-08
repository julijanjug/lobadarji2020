import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootStore } from 'src/root.store';
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
  private router: Router,
  private rootStore: RootStore
  ) { }
  ngOnInit() {
    this.map.buildMap();
    this.map.btnEnabled.subscribe(data => {this.disabledContinueBtn=data; console.log(data)});
  }

  async callPost(){
    var response = await this.map.postArea();
    console.log("2", response);
    this.rootStore.setResult(response);
    await this.router.navigate(['tp-info']);
    var r = this.rootStore.result
    console.log(r);
  }
}
