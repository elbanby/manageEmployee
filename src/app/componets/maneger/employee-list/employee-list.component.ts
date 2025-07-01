import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, combineLatest, debounceTime, distinctUntilChanged, map, merge, Observable, of, startWith, Subject, take, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../Model/nterfaces/IEmployee.interface';
import { IDailogData } from '../../../Model/nterfaces/IDailogData';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../Services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  nameSearchControl = new FormControl('');
  departmentFilter = new FormControl('');
  hireDateFilter = new FormControl('');
  statusFilter = new FormControl('all');

  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  private destroy$ = new Subject<void>();

  constructor(private employeeService: EmployeeService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.ValueChangesForFilter()
  }

  ValueChangesForFilter(): void {
    merge(
      this.nameSearchControl.valueChanges,
      this.departmentFilter.valueChanges,
      this.hireDateFilter.valueChanges,
      this.statusFilter.valueChanges
    )
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.applyFilters());
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.allEmployees = data;
        this.filteredEmployees = this.allEmployees
        // this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.allEmployees = [];
        this.filteredEmployees = [];
      }
    });
  }

  applyFilters(): void {
    const searchTerm = this.nameSearchControl.value?.toLowerCase().trim() || '';
    const deptTerm = this.departmentFilter.value?.toLowerCase().trim() || '';
    const dateTerm = this.hireDateFilter.value
      ? new Date(this.hireDateFilter.value).toDateString()
      : '';
    const status = this.statusFilter.value || 'all';

    this.filteredEmployees = this.allEmployees.filter(emp => {
      return (
        (`${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm)) &&
        (deptTerm === '' || emp.department.toLowerCase().includes(deptTerm)) &&
        (dateTerm === '' || new Date(emp.hireDate).toDateString() === dateTerm) &&
        (status === 'all' || emp.status === status)
      );
    });
  }

  OnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: { mode: 'add' } as IDailogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result);
        this.snackBar.open('Employee added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: { employee, mode: 'edit' } as IDailogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(employee.id, result);
        this.snackBar.open('Employee updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  openDeleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(employee.id);
        this.snackBar.open('Employee deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
