import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit{
  customerForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    membership: new FormControl(''),
    id: new FormControl(0),
  });

  constructor(private fb:FormBuilder,
    private store: Store<fromCustomer.AppState>){}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: 0
    });
  }

  customer$ = this.store.select(fromCustomer.getCurrentCustomer)
  .subscribe(currentCustomer => {
    if(currentCustomer){
      this.customerForm.patchValue({
        name: currentCustomer.name,
        phone: currentCustomer.phone,
        address: currentCustomer.address,
        membership: currentCustomer.membership,
        id: currentCustomer.id
      });
    }
  });

  updateCustomer(){
    const updatedCustomer: Customer = {
      name: this.customerForm.get('name')!.value,
      phone: this.customerForm.get('phone')!.value,
      address: this.customerForm.get('address')!.value,
      membership: this.customerForm.get('membership')!.value,
      id: this.customerForm.get("id")!.value
    };
    console.log(updatedCustomer)
    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
  }
}













