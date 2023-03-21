import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as customerActions from "../state/customer.actions"

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  customers: any;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.store.subscribe(state => this.customers = state.customers.customers);
  }
}
