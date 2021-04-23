import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent  {
  public medicines: PharmaMedicine[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<PharmaMedicine[]>(baseUrl + 'medicine').subscribe(result => {
      this.medicines = result;
      //Remove console-log after testing-Ashutosh
      console.log(result);
    }, error => console.error(error));
  }
}

interface PharmaMedicine {
  id: string;
  name: string;
  brand: string,
  price: number;
  quantity: number;
  expiry: string;
  notes: string;
}

