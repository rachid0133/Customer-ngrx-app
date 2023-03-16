import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {
    path: "", 
    component:HomeComponent
  },
  {
    path: "customers",
    loadChildren:() => import("../app/customers/customers.module").then(c=>c.CustomersModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
