import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { ConsultarInsumosComponent } from './consultar-insumos/consultar-insumos.component';
import { MainComponent } from './main/main.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormConInsComponent } from './consultar-insumos/form-con-ins/form-con-ins.component';
import { TableConInsComponent } from './consultar-insumos/table-con-ins/table-con-ins.component';
import { LogoutComponent } from '../logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,//COMPONENTE LOGIN,
    ConsultarInsumosComponent, MainComponent, FormConInsComponent, TableConInsComponent, LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

})
export class PagesModule { }
