import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormConInsService } from './form-con-ins.service';
import { ConsultarInsumosInterface } from '../consultar-insumos.interface';
import { Articulo } from '../../models-sap/articulo.model'

@Component({
  selector: 'app-form-con-ins',
  templateUrl: './form-con-ins.component.html',
  styleUrls: ['./form-con-ins.component.css']
})
export class FormConInsComponent implements OnInit {
  public dateMin=new Date(2021, 2, 3);
  public formulario: FormGroup;
  public articulos: Articulo[];
  @Output() public formConsultar: EventEmitter<ConsultarInsumosInterface> = new EventEmitter;

  constructor(private fb: FormBuilder,
    public formConsInsService: FormConInsService) {
    this.buildForm();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.formulario = this.fb.group(
      {
        insumo: ['DFAC', [Validators.required]],
        code: ['TODOS', [Validators.required]],
        dateFrom: ['', [Validators.required]],
        dateTo: ['', [Validators.required]],
      }
    );
  }

  private resetForm(): void {
    this.formulario.reset({
      insumo: 'DFAC',
      code: 'TODOS'
    });
  }

  private loadData(): void {
    let artTodos = new Articulo();
    artTodos.itemCode = 'TODOS';
    artTodos.itemName = '';
    this.formConsInsService.postArticulos()
      .then(
        data => {
          this.articulos = data.articulos as Articulo[];
          this.articulos.splice(0, 0, artTodos);//AGREGA ELEMENTO AL ARREGLO EN LA POSICION SERO SIN ELIMINAR ELEMENTOS DEL ARRAY
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  public search(): void {
    this.formConsultar.emit(this.formulario.value);
    // this.resetForm();
  }

}
