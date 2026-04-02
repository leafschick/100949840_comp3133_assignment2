import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList {
 employees = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@coffeehouse.com',
    department: 'Management',
    position: 'Store Manager'
  },
  {
    id: 2,
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@coffeehouse.com',
    department: 'Front of House',
    position: 'Barista'
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@coffeehouse.com',
    department: 'Kitchen',
    position: 'Pastry Chef'
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@coffeehouse.com',
    department: 'Operations',
    position: 'Shift Supervisor'
  }
];
}