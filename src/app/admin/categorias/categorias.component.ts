import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../servicos/categorias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  dataRow = {
    ID_CATEGORIA  : 0     ,
    CD_CATEGORIA  : ''    ,
    NM_CATEGORIA  : ''    ,
    DS_CATEGORIA  : ''    ,
    VL_META       : ''    ,
    SN_ATIVO      : true  ,
  }

  @ViewChild('modal') modal !: ElementRef
  @ViewChild('aviso') aviso !: ElementRef

  mensagem : string = ''
  dataGrid : Array<any> = []
  somenteLeitura = false
  salvarEditando = false

  constructor(private servico:CategoriasService){ }

  async ngOnInit() {
    this.dataGrid = await this.servico.gridCategoria()
  }

  async incluirRegistro(){
    let data = await this.servico.codigoCategoria()
    this.dataRow.CD_CATEGORIA = data[0].CD_CATEGORIA
    this.modal.nativeElement.showModal()
  }

  cancelarRegistro(){
    this.somenteLeitura = false
    this.salvarEditando = false
    this.modal.nativeElement.close()
    this.dataRow = {
      ID_CATEGORIA  : this.dataRow.ID_CATEGORIA ,
      CD_CATEGORIA  : ''    ,
      NM_CATEGORIA  : ''    ,
      DS_CATEGORIA  : ''    ,
      VL_META       : ''    ,
      SN_ATIVO      : true  ,
    }
  }

  async salvarRegistro(){
    let data = await this.servico.insertCategoria(this.dataRow)

    if(data.sucesso){
      this.dataGrid = await this.servico.gridCategoria()
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
    this.mensagem = ''
    this.aviso.nativeElement.close()
  }
  
  async consultaRegistro(){
    this.somenteLeitura = true
    this.dataRow = await this.servico.consultaCategoria(this.dataRow.ID_CATEGORIA)
    this.modal.nativeElement.showModal()
  }

  async editarRegistro(){
    this.salvarEditando = true
    this.dataRow = await this.servico.consultaCategoria(this.dataRow.ID_CATEGORIA)
    this.modal.nativeElement.showModal()
  }

  async excluirRegistro(){
    let data = await this.servico.deleteCategoria(this.dataRow.ID_CATEGORIA)

    if(data.sucesso){
      this.dataGrid = await this.servico.gridCategoria()
      this.mensagem = data.mensagem
      this.dataRow.ID_CATEGORIA = 0
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

  async alteracaoRegistro(){
    let data = await this.servico.alteraCategoria(this.dataRow, this.dataRow.ID_CATEGORIA)

    if(data.sucesso){
      this.mensagem = data.mensagem
      this.dataGrid = await this.servico.gridCategoria()
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }
}
