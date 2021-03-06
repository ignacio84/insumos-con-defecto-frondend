
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { PagesRoutesModule } from './pages/pages.routes.module'

const APP_ROUTES: Routes = [
 { path: 'login', component: LoginComponent },
  // { path: 'menu', component: MenuComponent, canActivate: [RoleGuard], data: { role: ['ROLE_ADMIN', 'ROLE_MATERIA', 'ROLE_USER'] } },//AUTH GUARD,S PROTEGEN LAS RUTAS
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),//APLICA RUTAS DEL MODULO MATERIA PRIMA
    PagesRoutesModule,//MODULO CON SUBRUTAS DE LA CARPETA PAGES
  ],
  exports: [RouterModule],
})
export class AppRoutesModule { }
