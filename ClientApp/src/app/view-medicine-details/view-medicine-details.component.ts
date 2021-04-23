import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-medicine-details',
  templateUrl: './view-medicine-details.component.html',
  styleUrls: ['./view-medicine-details.component.css']
})
export class ViewMedicineDetailsComponent {
  public medicine: Medicines;
  public Id: string;

constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  http.get<Medicines>(baseUrl + 'medicine' + '/' + this.Id).subscribe(result => {
    this.medicine = result;
  }, error => console.error(error));
}
}

interface Medicines {
  id: string;
  name: string;
  brand: string,
  price: number;
  quantity: number;
  expiry: string;
  notes: string;
}

