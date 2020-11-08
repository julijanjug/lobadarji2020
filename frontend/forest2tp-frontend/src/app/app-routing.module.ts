import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MapMbComponent } from './map-mb/map-mb.component';
import { TpInfoComponent } from './tp-info/tp-info.component';


const routes: Routes = [
  { path: 'tp-info', component: TpInfoComponent},
  { path: 'map-mb', component: MapMbComponent },
  { path:'**', pathMatch:'full', redirectTo:'map-mb'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
