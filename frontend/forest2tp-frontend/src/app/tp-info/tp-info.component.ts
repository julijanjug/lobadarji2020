import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RootStore } from '../../root.store';

@Component({
  selector: 'app-tp-info',
  templateUrl: './tp-info.component.html',
  styleUrls: ['./tp-info.component.scss']
})
export class TpInfoComponent implements OnInit {

  imgSrc = "https://services.sentinel-hub.com/ogc/wms/403fc28f-678e-4fd5-b629-640bab5faff7?REQUEST=GetMap&CRS=CRS%3A84&GEOMETRY=POLYGON%20((15.284724%2046.539263%2C15.351313%2046.496974%2C15.378086%2046.532178%2C15.304632%2046.571843%2C15.255205%2046.569955%2C15.284724%2046.539263))&LAYERS=NDVI&WIDTH=512&HEIGHT=453&FORMAT=image%2Fpng&fbclid=IwAR1770P8tDj3L_weTvrg3BVMM984bGKlh5Bfr6saNjwlqrHgEYSMClcZo2k"
  form: FormGroup;

  povrsina_gozda = 0;
  volumen_gozda = 0;

  stevilo_rolic = 0;
  stevilo_dni = 0;

  constructor(private formBuilder: FormBuilder, private rootStore: RootStore) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      forestType: ['LISTNATI', Validators.required],
      nPly: [2, [Validators.required, Validators.min(1)]],
      shitsPerDay: [1, [Validators.required, Validators.min(1)]],
      sheetsUsed: [1, [Validators.required, Validators.min(1)]],
      bothSideUsed: false
    });

    this.rootStore.result$.subscribe(res => {
      if (res && res.data) {
        this.povrsina_gozda = Math.round(res.data.m2 * 10) / 10;
        this.imgSrc = res.data.uri;

        this.calculateToiletPapers(this.povrsina_gozda);
      }
    });
  }

  calculateToiletPapers(povrsina) {
    const tip_gozda = this.form.get('forestType').value;

    const avg_r_smreka = 0.4;
    const avg_r_bukev = 0.35;
    const avg_h_smreka = 30;
    const avg_h_bukev = 25;

    //volumen smreke 
    const avg_V_smreka = 3.14 * avg_r_smreka * avg_r_smreka * avg_h_smreka;
    const avg_V_bukev = 3.14 * avg_r_bukev * avg_r_bukev * avg_h_bukev;

    //eno drevo na približno 6m2
    const dreves_na_m2 = 1/6;
    const st_dreves = povrsina * dreves_na_m2;

    //volumen gozda glede na tip
    if(tip_gozda == 'LISTNATI') {this.volumen_gozda = st_dreves * avg_V_bukev;}
    else if (tip_gozda == 'IGLASTI') {this.volumen_gozda = st_dreves * avg_V_smreka;}
    else {this.volumen_gozda = st_dreves * (avg_V_smreka + avg_V_bukev) / 2;}

    //1400 rolic na 
    const rolic_na_m2 = 1400 / this.form.get('nPly').value;

    this.stevilo_rolic = Math.round(this.volumen_gozda * rolic_na_m2 * 10) / 10;

    this.stevilo_dni = Math.round(this.stevilo_rolic * 160 / (this.form.get('shitsPerDay').value * this.form.get('sheetsUsed').value) * 10) / 10;
  }

}


