import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar-component/sidebar-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent {

}
