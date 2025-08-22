import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItensComponent } from '../itens/itens.component';
import { PromocoesService } from '../../servicos/promocoes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [FormsModule, CommonModule, ItensComponent],
  templateUrl: './promocoes.component.html',
  styleUrl: './promocoes.component.css'
})
export class PromocoesComponent implements OnInit{

  dataRow = {
    ID_PROMOCAO : 0   ,
    CD_PROMOCAO : ''  ,
    DT_INICIO   : ''  ,
    DT_FINAL    : ''  ,
    NM_PROMOCAO : ''  ,
    DS_PROMOCAO : ''  ,
  }

  @ViewChild('modal') modal !: ElementRef
  @ViewChild('aviso') aviso !: ElementRef
  @ViewChild(ItensComponent) itens !: ItensComponent

  mensagem        : string = ''
  dataGrid        : Array<any> = []
  somenteLeitura  = false
  salvarEditando  = false

  constructor(private servico : PromocoesService){}

  async ngOnInit() {
    this.dataGrid = await this.servico.gridPromocoes()
  }

  async incluirRegistro(){
    this.dataRow.CD_PROMOCAO = await this.servico.codigoPromocao()
    this.modal.nativeElement.showModal()
  }

  cancelarRegistro(){
    this.somenteLeitura = false
    this.salvarEditando = false
    this.itens.somenteLeitura = false
    this.itens.telaRegistro = false
    this.modal.nativeElement.close()
    this.itens.dataGrid = []
    this.itens.dataRow.ID_PRODUTO = 0
    this.dataRow = {
      ID_PROMOCAO : this.dataRow.ID_PROMOCAO,
      CD_PROMOCAO : ''  ,
      DT_INICIO   : ''  ,
      DT_FINAL    : ''  ,
      NM_PROMOCAO : ''  ,
      DS_PROMOCAO : ''  ,
    }
  }

  async salvarRegistro(){
    let data = await this.servico.salvarPromocao(this.dataRow, this.itens.dataGrid)

    if(data.sucesso){
      this.mensagem = data.mensagem
      this.dataGrid = await this.servico.gridPromocoes()
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

  async excluirRegistro(){
    let data = await this.servico.deletePromocao(this.dataRow.ID_PROMOCAO)

    if(data.sucesso){
      this.dataGrid = await this.servico.gridPromocoes()
      this.mensagem = data.mensagem
      this.itens.dataRow.ID_PRODUTO = 0
      this.dataRow.ID_PROMOCAO = 0
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

  async consultaRegistro(){
    this.somenteLeitura = true
    this.itens.somenteLeitura = true
    let data = await this.servico.consultaPromocao(this.dataRow.ID_PROMOCAO)

    this.itens.dataGrid = data.ITENS
    delete data.ITENS
    this.dataRow = data
    
    this.modal.nativeElement.showModal()
  }

  async editarRegistro(){
    this.salvarEditando = true
    let data = await this.servico.consultaPromocao(this.dataRow.ID_PROMOCAO)

    this.itens.dataGrid = data.ITENS
    delete data.ITENS
    this.dataRow = data

    this.modal.nativeElement.showModal()
  }

  async alteraRegistro(){
    let data = await this.servico.alteraPromocao(
      this.dataRow        ,
      this.itens.dataGrid ,
      this.dataRow.ID_PROMOCAO
    )

    if(data.sucesso){
      this.mensagem = data.mensagem
      this.dataGrid = await this.servico.gridPromocoes()
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

}
