import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['',  Validators.required],
      name: ['',  Validators.required],
      description: ['',  Validators.required],
      logo: ['',  Validators.required],
      date_release: ['',  Validators.required],      
      date_revision: [{value: '', disabled: true}, Validators.required]   
    });
  }

  ngOnInit() {
    this.form.controls['date_release'].valueChanges.subscribe(value => {
      let date_revision = '';
      if (value) {
        const newDate = new Date(value); // create object date

        newDate.setDate(newDate.getDate() + 1); // add 1 day
        newDate.setFullYear(newDate.getFullYear() + 1); // add 1 year

        date_revision = formatDate(newDate, 'yyyy-MM-dd', 'en'); // format date
      }

      this.form.controls['date_revision'].setValue(date_revision)
    })
  }

  submitForm(event: Event) {
    event.preventDefault(); // prevent reload the page
    const product = this.form.getRawValue(); // get form values
    this.productService.addProduct(product).subscribe((res: any) => {
      this.router.navigateByUrl('/');
    });
  }

  resetForm() {
    this.form.reset();
  }
}
