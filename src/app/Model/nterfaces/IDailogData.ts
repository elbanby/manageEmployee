import { Employee } from "./IEmployee.interface";

export interface IDailogData {
  employee?: Employee;
  mode: 'add' | 'edit';
}

