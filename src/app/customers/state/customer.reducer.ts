import * as customerActions from "./customer.actions"
import { Customer } from "../customer.model"
import * as fromRoot from "../../state/app-state"
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export interface CustomerState extends EntityState<Customer>{
    // customers: Customer[];
    selectedCustomerId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    customers: CustomerState;
}

export const defaultAdapter: CustomerState = {
    ids:[],
    entities:{},
    selectedCustomerId : null,
    loading: false,
    loaded:false,
    error:""
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState = customerAdapter.getInitialState(defaultAdapter);
// export const initialState: CustomerState = {
//     customers: [],
//     loading: false,
//     loaded: false,
//     error: ""
// }

export function customerReducer(state = initialState, action: customerActions.Actions): CustomerState {
    switch (action.type) {
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS:
            {
                return {
                    ...state,
                    loading: true,
                    loaded: false,
                }
            }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS:
            {
                // return {
                //     ...state,
                //     loading: false,
                //     loaded: true,
                //     customers: action.payload
                // }
                return customerAdapter.addMany(action.payload, {
                    ...state,
                    loading: false,
                    loaded: true,
                });
            }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL:
            {
                return {
                    ...state,
                    // customers:[],
                    entities:{},
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            }
        default: {
            return state;
        }
    }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>("customers");
export const getCustomers = createSelector(getCustomerFeatureState,
    // (state: CustomerState) => state.customers
    customerAdapter.getSelectors().selectAll
    );

export const getCustomersLoading = createSelector(getCustomerFeatureState,
        (state: CustomerState) => state.loading);

export const getCustomersLoaded = createSelector(getCustomerFeatureState,
            (state: CustomerState) => state.loaded);

export const getError = createSelector(getCustomerFeatureState,
                (state: CustomerState) => state.error);


// import { Action } from "@ngrx/store";

// const initialState = {
//     customers: [
//         {
//             name: 'John Doe',
//             phone: '5145180907',
//             address: '123 hmaster street',
//             membership: 'Platinum',
//             id: 1
//         }
//     ],
//     loading: false,
//     loaded: true
// }

// export function customerReducer(state = initialState, action: Action) {
//     switch (action.type) {
//         case "LOAD_CUSTOMERS": {
//             return {
//                 ...state,
//                 loading: true,
//                 loaded: false
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }