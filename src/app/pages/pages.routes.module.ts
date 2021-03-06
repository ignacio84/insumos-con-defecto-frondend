
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarInsumosComponent } from './consultar-insumos/consultar-insumos.component'
import { RoleGuard } from '../security/guards/role.guard'
import { PagesModule } from './pages.module';

export const PAGES_ROUTES: Routes = [
  {
    path: 'con-ins',
    component: ConsultarInsumosComponent,
    canActivate: [RoleGuard], data: { role: ['ROLE_ADMIN', 'ROLE_CONINS'] },//PLICA RESTRICCIONES A TODAS LAS RUTAS HIJAS
    canLoad: [RoleGuard],
    // loadChildren: () => import('./materia-prima-child.routes.module').then(m => m.MateriaPrimaChildRoutesModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(PAGES_ROUTES),
  ],
  exports: [RouterModule],
})
export class PagesRoutesModule { }
