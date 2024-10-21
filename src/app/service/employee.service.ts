import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  private fireBase: Firestore
  constructor(fireBase: Firestore){
    this.fireBase = fireBase
  }
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.fireBase, 'employees');  // our collection of employees
    return collectionData(employees, {idField: "id"}) as Observable<Employee[]>  // the collection data
  }

  addEmployee(employee: Employee) {
    return addDoc(collection(this.fireBase, "employees"), employee)   // adds employee to the firestore
  }
}
