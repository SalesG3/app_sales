import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../servicos/produtos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  dataRow = {
    ID_PRODUTO  : 0     ,
    CD_PRODUTO  : ''    ,
    SN_ATIVO    : true  ,
    IMG_PRODUTO : ''    ,
    NM_PRODUTO  : ''    ,
    DS_PRODUTO  : ''    ,
    ID_CATEGORIA: 0     ,
    VL_CUSTO    : ''    ,
    VL_PRODUTO  : ''    ,
  }

  @ViewChild('modal') modal !: ElementRef

  dataCategorias : Array<any> = []

  constructor( private servico : ProdutosService){ }

  async incluirRegistro(){
    this.dataRow.CD_PRODUTO = await this.servico.codigoProduto()
    this.dataCategorias = await this.servico.lookupCategoria()
    this.modal.nativeElement.showModal()
  }
}
