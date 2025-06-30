export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  hireDate: string;
  status: 'Active' | 'Suspended';
}
