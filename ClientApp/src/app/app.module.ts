import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { ViewMedicineDetailsComponent } from './view-medicine-details/view-medicine-details.component';
import { SearchMedicineDetailsComponent } from './search-medicine-details/search-medicine-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    MedicinesComponent,
    AddMedicineComponent,
    UpdateMedicineComponent,
    ViewMedicineDetailsComponent,
    SearchMedicineDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      {path: 'medicines', component: MedicinesComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
