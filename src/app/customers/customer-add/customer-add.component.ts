import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCustomer from "../state/customer.reducer";
import { Customer } from '../customer.model';
import * as customerActions from "../state/customer.actions"

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit{

  customerForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      membership: new FormControl(''),
  });

  constructor(private fb:FormBuilder,
    private store: Store<fromCustomer.AppState>){}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
    });
  }

  createCustomer(){
    const newCustomer: Customer = {
      name: this.customerForm.get('name')!.value,
      phone: this.customerForm.get("phone")!.value,
      address: this.customerForm.get("address")!.value,
      membership: this.customerForm.get("membership")!.value,
    };
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));

    this.customerForm.reset();
  }

}
