import { Routes } from '@angular/router';
import { CustomerListComponent } from './modules/dashboard/customer-list/customer-list.component';
import { CustomerAddComponent } from './modules/dashboard/customer-add/customer-add.component';
import { CustomerEditComponent } from './modules/dashboard/customer-edit/customer-edit.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-add',
    component: CustomerAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-edit/:id',
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
  },
];
