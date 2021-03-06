import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { ConsultarInsumosComponent } from './consultar-insumos/consultar-insumos.component';
import { MainComponent } from './main/main.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    LoginComponent,//COMPONENTE LOGIN,
    ConsultarInsumosComponent, MainComponent
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
