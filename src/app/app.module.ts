import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent],
  imports: [AppRoutingModule, BrowserModule, CoreModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
