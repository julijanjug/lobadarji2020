import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { TpInfoComponent } from './tp-info/tp-info.component';


const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'tp-info', component: TpInfoComponent},
  { path:'**', pathMatch:'full', redirectTo:'tp-info'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
