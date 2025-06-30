import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDailogData } from '../../../Model/nterfaces/IDailogData';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDailogData
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: [
        this.data.employee?.firstName || '',
        [Validators.required, Validators.minLength(2)]
      ],
      lastName: [
        this.data.employee?.lastName || '',
        [Validators.required, Validators.minLength(2)]
      ],
      department: [
        this.data.employee?.department || '',
        [Validators.required]
      ],
      hireDate: [
        this.data.employee ? new Date(this.data.employee.hireDate) : new Date(),
        [Validators.required]
      ],
      status: [
        this.data.employee?.status || 'Active',
        [Validators.required]
      ]
    });
  }

  getControl(controlName: string) {
    return this.employeeForm.get(controlName);
  }

  onSave(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employee = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        department: formValue.department,
        hireDate: formValue.hireDate.toISOString().split('T')[0],
        status: formValue.status
      };

      this.dialogRef.close(employee);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
