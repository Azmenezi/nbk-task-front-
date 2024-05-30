import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CustomerEditComponent implements OnInit {
  customer: any = {
    number: '',
    name: '',
    dateOfBirth: '',
    gender: 'male',
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getCustomer(Number(id)).subscribe(
        (data) => (this.customer = data),
        (error) => console.error('Error fetching customer', error)
      );
    }
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.updateCustomer(Number(id), this.customer).subscribe(
        () => this.router.navigate(['/customers']),
        (error) => console.error('Error updating customer', error)
      );
    }
  }
}
