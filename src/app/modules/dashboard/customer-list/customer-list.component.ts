import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  customerToDelete: any = null;
  queryCustomer: any = null;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.checkQueryParams();
    });
  }

  checkQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['delete']) {
        const customer = this.customers.find((c) => c.id === +params['delete']);
        if (customer) {
          this.queryCustomer = customer;
          this.customerToDelete = customer;
        }
      }
    });
  }

  deleteCustomer(id: number): void {
    const customer = this.customers.find((c) => c.id === id);
    if (customer) {
      this.customerToDelete = customer;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { delete: id },
        queryParamsHandling: 'merge',
      });
    }
  }

  confirmDelete(): void {
    if (this.customerToDelete) {
      this.customerService
        .deleteCustomer(this.customerToDelete.id)
        .subscribe(() => {
          this.customers = this.customers.filter(
            (customer) => customer.id !== this.customerToDelete.id
          );
          this.customerToDelete = null;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { delete: null },
            queryParamsHandling: 'merge',
          });
        });
    }
  }

  cancelDelete(): void {
    this.customerToDelete = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { delete: null },
      queryParamsHandling: 'merge',
    });
  }
}
