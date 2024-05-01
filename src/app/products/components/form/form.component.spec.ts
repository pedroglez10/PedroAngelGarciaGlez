import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check FORM invalid', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('Check ID required', () => {
    expect(component.form.controls['id'].hasError('required')).toBeTruthy();
  });

  it('Check NAME required', () => {
    expect(component.form.controls['name'].hasError('required')).toBeTruthy();
  });

  it('Check DESCRIPTION required', () => {
    expect(component.form.controls['description'].hasError('required')).toBeTruthy();
  });

  it('Check DESCRIPTION required', () => {
    expect(component.form.controls['description'].hasError('required')).toBeTruthy();
  });

  it('Check LOGO required', () => {
    expect(component.form.controls['logo'].hasError('required')).toBeTruthy();
  });

  it('Check DATE_RELEASE required', () => {
    expect(component.form.controls['date_release'].hasError('required')).toBeTruthy();
  });

  it('Check DATE_REVISION disabled', () => {
    expect(component.form.controls['date_revision'].disabled).toBeTruthy();
  });
});
