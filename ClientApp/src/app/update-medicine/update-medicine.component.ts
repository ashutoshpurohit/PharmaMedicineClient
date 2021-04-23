import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent {

  public medicine: UpdatePharmaMedicine;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let _headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    http.put(baseUrl + 'medicine', JSON.stringify(this.medicine), { headers: _headers }).subscribe(result => {

      //Remove console-log after testing-Ashutosh
      console.log(result);
    }, error => console.error(error));
  }
}

interface UpdatePharmaMedicine {
  name: string;
  brand: string,
  price: number;
  quantity: number;
  expiry: string;
  notes: string;
}
