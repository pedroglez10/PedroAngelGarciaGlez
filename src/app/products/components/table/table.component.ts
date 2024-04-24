import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../../../shared/pipes/filter-products/filter-products.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, FormsModule, FilterProductsPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  products: Product[] | undefined;
  search: string = ''

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.products$.subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  goToForm() {
    this.router.navigateByUrl(`/producto`);
  }
}
