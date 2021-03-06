import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes.module';
import { TokenInterceptor } from './security/interceptors/token.interceptor';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    BrowserAnimationsModule,//IMPORTA EL MODULE QUE CONTIENE LAS RUTAS DE LA APP
    // PagesModule
  ],
  exports: [
    BrowserModule,
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
