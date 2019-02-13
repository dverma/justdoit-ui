import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  authorized = false;
  invalidLogin = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  handleJWTAuthLogin() {
    console.log(this.username, this.password);
    this.authenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.authorized = true;
          this.router.navigate(['tasks']);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }
}
