import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand text-light" routerLink="/">Home</a>
      </div>
    </nav>

    <div class="container py-4 px-3 mx-auto">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
