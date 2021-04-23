import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {
  public medicine: AddPharmaMedicine;
  public created_medicine: CreatedMedicineData;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let _headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    http.post(baseUrl + 'medicine', JSON.stringify(this.medicine), { headers: _headers } ).subscribe(result => {
      
      //Remove console-log after testing-Ashutosh
      console.log(result);
    }, error => console.error(error));
  }
}

interface AddPharmaMedicine {
  name: string;
  brand: string,
  price: number;
  quantity: number;
  expiry: string;
  notes: string;
}

interface CreatedMedicineData {
  id: string;
  name: string;
  brand: string,
  price: number;
  quantity: number;
  expiry: string;
  notes: string;
}
