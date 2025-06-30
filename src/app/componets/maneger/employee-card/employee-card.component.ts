
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../../Model/nterfaces/IEmployee.interface';
@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  ngOnInit(): void {

  }

  @Input() employee!: Employee;
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  onEdit(): void {
    this.edit.emit(this.employee);
  }

  onDelete(): void {
    this.delete.emit(this.employee);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

}
