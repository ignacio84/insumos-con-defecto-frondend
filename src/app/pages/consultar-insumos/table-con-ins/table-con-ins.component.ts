import { Component, OnInit, Input } from '@angular/core';
import { ConsultarInsumosInterface } from '../consultar-insumos.interface';
import { TableConInsService } from '../table-con-ins/table-con-ins.service';
import { InsumosModel } from '../../models-scanner/insumos.model'
import { InsumoInterface } from '../table-con-ins/insumo.interface'


@Component({
  selector: 'app-table-con-ins',
  templateUrl: './table-con-ins.component.html',
  styleUrls: ['./table-con-ins.component.css']
})
export class TableConInsComponent implements OnInit {

  public insumos: InsumosModel[];
  public insumosInterface: InsumoInterface[];
  @Input() public formConsultar: ConsultarInsumosInterface;

  constructor(public tableConInsService: TableConInsService) { }

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
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10061');
        break;
      }
      case 'E10067': {
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10067');
        break;
      }
      case 'E10083': {
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10083');
        break;
      }
      case 'E10089': {
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10089');
        break;
      }
      case 'TODOS': {
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10061');
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10067');
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10083');
        this.buildListInterface(prefix, 'DESCRIPCION', 'E10089');
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

  ngOnInit(): void {
  }

}
