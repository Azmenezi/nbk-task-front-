import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './modules/dashboard/customer-list/customer-list.component';
import { CustomerAddComponent } from './modules/dashboard/customer-add/customer-add.component';
import { CustomerEditComponent } from './modules/dashboard/customer-edit/customer-edit.component';
import { LoginComponent } from './modules/login/login.component';

import { CustomerService } from './services/customer.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CustomerService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
