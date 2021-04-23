import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedicineDetailsComponent } from './search-medicine-details.component';

describe('SearchMedicineDetailsComponent', () => {
  let component: SearchMedicineDetailsComponent;
  let fixture: ComponentFixture<SearchMedicineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMedicineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMedicineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
