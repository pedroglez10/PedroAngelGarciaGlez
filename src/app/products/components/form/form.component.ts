import { CommonModule, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form!: FormGroup;
  @Input() id?: string;
  existProduct: boolean = false;
  product: Product | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['',  [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['',  Validators.required],
      date_release: ['',  Validators.required],      
      date_revision: [{value: '', disabled: true}, Validators.required]   
    });
  }

  ngOnInit() {
    if (this.id) {
      console.log(`Editar: ${this.id}`)
      this.checkIdProduct();
    }

    this.form.controls['date_release'].valueChanges.subscribe(value => {
      let date_revision = '';
      if (value) {
        const newDate = new Date(value); // create object date

        newDate.setDate(newDate.getDate() + 1); // add 1 day

        // validate date greater than or equal to current date
        if (!this.validateDate(newDate)) {
          this.form.controls['date_release'].setErrors({'invalid_date': true});
          this.form.controls['date_revision'].setValue(null)
          return;
        }

        newDate.setFullYear(newDate.getFullYear() + 1); // add 1 year

        date_revision = formatDate(newDate, 'yyyy-MM-dd', 'en'); // format date
      }

      this.form.controls['date_revision'].setValue(date_revision)
    })

    // validate existing ID
    if (!this.id) {
      this.form.controls['id'].valueChanges.subscribe(value => {
        this.productService.verifyProduct(value)
        .subscribe(res => {
          if (res && !this.id)
            this.form.controls['id'].setErrors({'duplicate': true})
        })
      })
    }
  }

  submitForm(event: Event) {
    event.preventDefault(); // prevent reload the page
    const product = this.form.getRawValue(); // get form values
    if (this.existProduct) {
      this.productService.modifyProduct(product).subscribe((res: any) => {
        this.router.navigateByUrl('/');
      });
    } else {
      this.productService.addProduct(product).subscribe((res: any) => {
        this.router.navigateByUrl('/');
      });
    }
  }

  resetForm() {
    if (!this.id) // adding form
      this.form.reset(); // clean form
    else // updating form
      this.form.patchValue(this.product!) // set form with previous data
  }

  checkIdProduct() {
    this.productService.verifyProduct(this.id!)
    .subscribe(res => {
      this.existProduct = res
      if (res) {
        this.form.controls['id'].disable();

        this.productService.products$.subscribe((res: Product[]) => {
          const product = res.filter((p: any) => p.id === this.id)
          if (product){
            this.product = product[0];
            this.form.patchValue(product[0])
          }
        })
      } else {
        this.router.navigateByUrl('/');
      }
    })
  }

  validateDate(date: Date): boolean {
    const currentdate = new Date();
    date.setHours(0,0,0,0);
    currentdate.setHours(0,0,0,0);
    
    if (!this.id) { // adding form
      if (date < currentdate)
        return false;
      else
      return true;
    } else { // updating form
      const productdate = new Date(this.product!.date_release);
      productdate.setDate(productdate.getDate() + 1); // add 1 day
      productdate.setHours(0,0,0,0);

      if (productdate.getTime() != date.getTime()) { // validate if product date change
        if (date < currentdate)
          return false;
        else
          return true;
      } else {
        return true;        
      }
    }
  }
}
