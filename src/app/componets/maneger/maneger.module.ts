import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManegerComponent } from './maneger.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AngularMaterialModule } from '../../shard/anguler-material/anguler-material.module';


@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    ManegerComponent,
    ConfirmDialogComponent,
    EmployeeCardComponent,
    EmployeeFormComponent,
    EmployeeListComponent
  ], exports: [
    EmployeeListComponent,
    ManegerComponent
  ]
})
export class ManegerModule { }
