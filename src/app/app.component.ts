import { Component } from '@angular/core';
import { NAV_ITEMS } from './navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sales-system';
  navItems = NAV_ITEMS;
}
