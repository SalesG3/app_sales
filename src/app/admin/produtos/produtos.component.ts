import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ProdutosComponent implements OnInit {

  dataRow = {
    ID_PRODUTO  : 0     ,
    IMG_PRODUTO : ''    ,
    CD_PRODUTO  : ''    ,
    SN_ATIVO    : true  ,
    NM_PRODUTO  : ''    ,
    DS_PRODUTO  : ''    ,
    ID_CATEGORIA: 0     ,
    VL_CUSTO    : ''    ,
    VL_PRODUTO  : ''    ,
  }

  IMG_PRODUTO : any
  IMG_INPUT: any

  @ViewChild('modal') modal !: ElementRef
  @ViewChild('aviso') aviso !: ElementRef
  @ViewChild('imagem') imagem !: ElementRef

  mensagem        : string = ''
  dataCategorias  : Array<any> = []
  dataGrid        : Array<any> = []
  somenteLeitura  = false
  salvarEditando  = false

  constructor( private servico : ProdutosService){ }

  async ngOnInit() {
    this.dataGrid = await this.servico.gridProduto()
    this.dataCategorias = await this.servico.lookupCategoria()
  }

  async incluirRegistro(){
    this.dataRow.CD_PRODUTO = await this.servico.codigoProduto()
    this.modal.nativeElement.showModal()
  }

  cancelarRegistro(){
    this.modal.nativeElement.close()
    this.somenteLeitura = false
    this.salvarEditando = false
    this.IMG_PRODUTO = null
    this.IMG_INPUT = null
    this.dataRow = {
      ID_PRODUTO  : this.dataRow.ID_PRODUTO ,
      IMG_PRODUTO : ''    ,
      CD_PRODUTO  : ''    ,
      SN_ATIVO    : true  ,
      NM_PRODUTO  : ''    ,
      DS_PRODUTO  : ''    ,
      ID_CATEGORIA: 0     ,
      VL_CUSTO    : ''    ,
      VL_PRODUTO  : ''    ,
    }
  }

  async salvarRegistro(){
    let data = await this.servico.salvarProduto(this.dataRow)

    if(data.sucesso){
      if(this.IMG_PRODUTO){
        await this.servico.salvarImagem(this.IMG_PRODUTO, data.ID_PRODUTO)
      }

      this.dataGrid = await this.servico.gridProduto()
      this.mensagem = data.mensagem
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

  fecharAviso(){
    this.aviso.nativeElement.close()
    this.mensagem = ''
  }

  async consultaRegistro(){
    this.dataRow = await this.servico.consultaProduto(this.dataRow.ID_PRODUTO)
    this.somenteLeitura = true
    this.modal.nativeElement.showModal()
  }

  async editarRegistro(){
    this.salvarEditando = true
    this.dataRow = await this.servico.consultaProduto(this.dataRow.ID_PRODUTO)
    this.modal.nativeElement.showModal()
  }

  tratarImagem(e : Event){
    let input = e.target as HTMLInputElement

    if(input.files){
      this.IMG_PRODUTO = input.files[0]
    }
  }

  async alteraRegistro(){
    let data = await this.servico.alteraProduto(this.dataRow.ID_PRODUTO, this.dataRow)

    if(data.sucesso){
      if(this.IMG_PRODUTO){
        await this.servico.salvarImagem(this.IMG_PRODUTO, this.dataRow.ID_PRODUTO)
      }

      this.dataGrid = await this.servico.gridProduto()
      this.mensagem = data.mensagem
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

  async excluirRegistro(){
    let data = await this.servico.deleteRegistro(this.dataRow.ID_PRODUTO)

    if(data.sucesso){
      this.dataGrid = await this.servico.gridProduto()
      this.mensagem = data.mensagem
      this.cancelarRegistro()
      this.dataRow.ID_PRODUTO = 0 
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }
}
