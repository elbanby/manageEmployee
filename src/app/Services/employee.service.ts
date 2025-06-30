import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../Model/nterfaces/IEmployee.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private employees: Employee[] = [
  {
    id: 1,
    firstName: 'Ahmed',
    lastName: 'Hassan',
    department: 'Engineering',
    hireDate: '2022-01-15',
    status: 'Active'
  },
  {
    id: 2,
    firstName: 'Amina',
    lastName: 'Youssef',
    department: 'Marketing',
    hireDate: '2021-06-10',
    status: 'Active'
  },
  {
    id: 3,
    firstName: 'Omar',
    lastName: 'Ali',
    department: 'Sales',
    hireDate: '2023-03-20',
    status: 'Suspended'
  },
  {
    id: 4,
    firstName: 'Mona',
    lastName: 'Ibrahim',
    department: 'HR',
    hireDate: '2020-11-05',
    status: 'Active'
  },
  {
    id: 5,
    firstName: 'Khaled',
    lastName: 'Nasser',
    department: 'Engineering',
    hireDate: '2022-08-12',
    status: 'Active'
  },
  {
    id: 6,
    firstName: 'Mohamed',
    lastName: 'Salem',
    department: 'Finance',
    hireDate: '2021-02-28',
    status: 'Suspended'
  },
  {
    id: 7,
    firstName: 'Tariq',
    lastName: 'Fahmy',
    department: 'Operations',
    hireDate: '2023-01-10',
    status: 'Active'
  },
  {
    id: 8,
    firstName: 'Mohamed',
    lastName: 'Abdelazeam',
    department: 'Marketing',
    hireDate: '2022-04-18',
    status: 'Active'
  }
];


  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  public employees$ = this.employeesSubject.asObservable();

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = {
      ...employee,
      id: Math.max(...this.employees.map(e => e.id), 0) + 1
    };
    this.employees.push(newEmployee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(id: number, updatedEmployee: Omit<Employee, 'id'>): void {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmployee, id };
      this.employeesSubject.next([...this.employees]);
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next([...this.employees]);
  }
}
