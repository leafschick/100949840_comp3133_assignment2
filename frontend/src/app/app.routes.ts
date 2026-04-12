import { Routes } from '@angular/router';

import { Homepage } from './pages/homepage/homepage';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { EmployeeList } from './pages/employee-list/employee-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EditEmployee } from './pages/edit-employee/edit-employee';
import { EmployeeDetail } from './pages/employee-detail/employee-detail';
import { EmployeeResources } from './pages/employee-resources/employee-resources';
import { TeamDirectory } from './pages/team-directory/team-directory';
import { Onboarding } from './pages/onboarding/onboarding';
import { Forms } from './pages/forms/forms';
import { EmployeeAvailability } from './pages/employee-availability/employee-availability';
import { TimeOffRequest } from './pages/time-off-request/time-off-request';
import { IncidentReport } from './pages/incident-report/incident-report';
import { DailyChecklist } from './pages/daily-checklist/daily-checklist';
import { NewHireForm } from './pages/new-hire-form/new-hire-form';
import { PayrollBenefits } from './pages/payroll-benefits/payroll-benefits';


export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: 'add-employee', component: AddEmployee },
  { path: 'edit-employee/:id', component: EditEmployee },
  { path: 'employee/:id', component: EmployeeDetail },
  { path: 'employee-resources', component: EmployeeResources },
  {path: 'team-directory', component: TeamDirectory },
  {path: 'onboarding', component: Onboarding },
  {path: 'forms', component: Forms },
  {path: 'employee-availability', component: EmployeeAvailability },
  {path: 'time-off-request', component: TimeOffRequest },
  {path: 'incident-report', component: IncidentReport },
  {path: 'daily-checklist', component: DailyChecklist },
  {path: 'new-hire-form', component: NewHireForm },
  {path: 'payroll-benefits', component: PayrollBenefits }
];