import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ConfirmationModalComponent,
  ],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  totalCustomers = 0;
  page = 1;
  limit = 10;
  customerToDelete: any = null;
  queryCustomer: any = null;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkQueryParams();
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? +params['page'] : this.page;
      this.limit = params['limit'] ? +params['limit'] : this.limit;

      this.customerService
        .getCustomers(this.page, this.limit)
        .subscribe((data) => {
          this.customers = data.customers;
          this.totalCustomers = data.total;
        });
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
          this.fetchCustomers();
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

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page, limit: this.limit },
        queryParamsHandling: 'merge',
      });
    }
  }

  onLimitChange(limit: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { limit: limit, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  totalPages(): number {
    return Math.ceil(this.totalCustomers / this.limit);
  }
}
