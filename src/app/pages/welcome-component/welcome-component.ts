import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-welcome-component',
  imports: [],
  templateUrl: './welcome-component.html',
  styleUrl: './welcome-component.css'
})
export class WelcomeComponent implements OnInit {

  user:any = null;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }


}
