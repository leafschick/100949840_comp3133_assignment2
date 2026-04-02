import { Routes } from '@angular/router';

import { Homepage } from './pages/homepage/homepage';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { EmployeeList } from './pages/employee-list/employee-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EditEmployee } from './pages/edit-employee/edit-employee';
import { EmployeeDetail } from './pages/employee-detail/employee-detail';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: 'add-employee', component: AddEmployee },
  { path: 'edit-employee/:id', component: EditEmployee },
  { path: 'employee/:id', component: EmployeeDetail }
];