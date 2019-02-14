import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Just Do It';
  constructor(authService: AuthenticationService, router: Router) {
    if (authService.isUserLoggedIn()) {
      router.navigate(['tasks']);
    }
    else {
      router.navigate(['login']);
    }
  }
}
