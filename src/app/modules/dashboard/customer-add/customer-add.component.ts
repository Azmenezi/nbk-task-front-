import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CustomerAddComponent {
  customer: any = {
    number: '',
    name: '',
    dateOfBirth: '',
    gender: 'male',
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log(this.customer);
    this.customerService.createCustomer(this.customer).subscribe(
      () => this.router.navigate(['/customers']),
      (error) => console.error('Error creating customer', error)
    );
  }
}
