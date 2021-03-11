import { Component, OnInit } from '@angular/core';
import { ConsultarInsumosInterface } from './consultar-insumos.interface';

@Component({
  selector: 'app-consultar-insumos',
  templateUrl: './consultar-insumos.component.html',
  styleUrls: ['./consultar-insumos.component.css']
})


export class ConsultarInsumosComponent implements OnInit {
  public formConsultar: ConsultarInsumosInterface;

  constructor() {
  }

  ngOnInit(): void {
  }

  public reciberForm(formValues: ConsultarInsumosInterface) {
    this.formConsultar = formValues;
  }
}
