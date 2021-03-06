import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultarInsumosService } from './consultar-insumos.service';

@Component({
  selector: 'app-consultar-insumos',
  templateUrl: './consultar-insumos.component.html',
  styleUrls: ['./consultar-insumos.component.css']
})
export class ConsultarInsumosComponent implements OnInit {

  public formulario: FormGroup;

  constructor(private fb: FormBuilder,
    public consService: ConsultarInsumosService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.consService.test()
      .then(
        data => {
          console.log(data)
        }
      )
  }

  private buildForm(): void {
    this.formulario = this.fb.group(
      {
        insumo: ['', [Validators.required]],
        dateFrom: ['', [Validators.required]],
        dateTo: ['', [Validators.required]],
      }
    );
  }
}
