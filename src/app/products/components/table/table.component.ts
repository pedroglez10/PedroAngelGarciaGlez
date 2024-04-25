import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../../../shared/pipes/filter-products/filter-products.pipe';
import { DropdownComponent } from '../../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    DatePipe, 
    FormsModule, 
    FilterProductsPipe,
    DropdownComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  products: Product[] | undefined;
  product: Product | undefined;
  search: string = ''
  cantRows: number = 5;
  @ViewChild('deleteProductDialog') deleteProductDialog: ElementRef | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private eRef: ElementRef
  ) { 
    this.productService.getProducts();
  }

  ngOnInit() {
    this.productService.products$.subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  goToForm() {
    this.router.navigateByUrl(`/producto`);
  }

  selectedProduct(product: Product) {
    this.product = product;
  }

  deleteSelectedProduct() {
    this.productService.deleteProduct(this.product?.id!)
    .subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.log('delete error',error)
        if (error.status == 200) {
          this.productService.getProducts();
          this.deleteProductDialog?.nativeElement.close();
          alert(error.error.text)
        }
      }
    })
  }
}
