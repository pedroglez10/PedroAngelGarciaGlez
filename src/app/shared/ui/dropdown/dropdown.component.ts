import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../products/services/product/product.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() id?: string;
  @Input()
  dialog!: HTMLDialogElement;
  @ViewChild("dropdownContent")
  dropdown_content!: ElementRef;
  
  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) { }

  openActions() {
    this.renderer.setStyle(this.dropdown_content.nativeElement, 'display', 'block');
  }

  closeActions() {
    this.renderer.setStyle(this.dropdown_content.nativeElement, 'display', 'none');
  }

  editProduct() {
    this.router.navigateByUrl(`/producto/${this.id}`);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.closeActions();
    } 
  }
}
