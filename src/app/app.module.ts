import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { TaskComponent } from './task/task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorJWTService } from './service/http/http-interceptor-jwt.service';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    LogoutComponent,
    ErrorComponent,
    TaskComponent,
    ListTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorJWTService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
