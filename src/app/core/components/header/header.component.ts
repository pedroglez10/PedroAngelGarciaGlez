import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `<div class="nav"><h1>BANCO</h1></div>`,
  styles: ['.nav {text-align: center;}']
})
export class HeaderComponent {

}
