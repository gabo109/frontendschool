import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-profile-component',
  imports: [],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }



}
