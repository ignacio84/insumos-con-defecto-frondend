import { Component, OnInit, Input } from '@angular/core';
import { ConsultarInsumosInterface } from '../consultar-insumos.interface';
import { TableConInsService } from '../table-con-ins/table-con-ins.service';
import { InsumosModel } from '../../models-scanner/insumos.model'
import { InsumoInterface } from '../table-con-ins/insumo.interface'
import { FormConInsService } from '../form-con-ins/form-con-ins.service';
import { Articulo } from '../../models-sap/articulo.model';


@Component({
  selector: 'app-table-con-ins',
  templateUrl: './table-con-ins.component.html',
  styleUrls: ['./table-con-ins.component.css']
})
export class TableConInsComponent implements OnInit {
  private articulos: Articulo[];
  public insumos: InsumosModel[];
  public insumosInterface: InsumoInterface[];
  @Input() public formConsultar: ConsultarInsumosInterface;

  constructor(public tableConInsService: TableConInsService, private formConsInsService: FormConInsService) {
    this.loadData();
  }

  ngOnChanges(changes: any) {
    this.insumosInterface = []
    if (this.formConsultar) {
      this.callService();
    }
  }

  private callService(): void {
    this.tableConInsService.postInsumos(this.formConsultar)
      .then(
        data => {
          this.insumos = data.insumos as InsumosModel[];
          console.log(this.insumos);
          this.filterCode();
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }


  private filterCode() {
    let prefix = (this.formConsultar.insumo === 'DPRO') ? 'Danada' : 'Defecto';//Se genera prefijo para generar el nombre de variable, dependeindo el tipo de insumo para
    switch (this.formConsultar.code) {
      case 'E10061': {
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10061').itemName, 'E10061');
        break;
      }
      case 'E10067': {
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10067').itemName, 'E10067');
        break;
      }
      case 'E10083': {
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10083').itemName, 'E10083');
        break;
      }
      case 'E10089': {
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10089').itemName, 'E10089');
        break;
      }
      case 'TODOS': {
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10061').itemName, 'E10061');
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10067').itemName, 'E10067');
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10083').itemName, 'E10083');
        this.buildListInterface(prefix, this.articulos.find(data => data.itemCode === 'E10089').itemName, 'E10089');
        break;
      }
    }
  }

  private buildListInterface(prefix: string, description: string, name: string) {
    console.log(prefix);
    this.insumosInterface.push({
      code: name,
      descripcion: description,
      quantity: this.insumos.reduce((a, b) => Number(a) + Number(b['cantidad' + prefix + name]), 0).toString()//Concatena strings para generar nombre de variable
    })
  }

  private loadData(): void {
    this.formConsInsService.postArticulos()
      .then(
        data => {
          this.articulos = data.articulos as Articulo[];
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  ngOnInit(): void {
  }

}
