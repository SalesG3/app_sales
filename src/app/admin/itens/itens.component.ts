import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PromocoesService } from '../../servicos/promocoes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent implements OnInit{
  
  dataRow = {
    ID_PRODUTO  : 0   ,
    VL_PRODUTO  : 0   ,
    PC_PROMOCAO : 0   ,
    VL_PROMOCAO : 0   ,
    SN_ATIVO    : true,
    STATUS      : ''  ,
  }
  
  mensagem        : string = ''
  dataGrid        : Array<any> = []
  dataProdutos    : Array<any> = []
  telaRegistro    = false
  salvarEditando  = false

  @ViewChild('aviso') aviso !: ElementRef

  constructor(private servico : PromocoesService){ }

  async ngOnInit() {
    this.dataProdutos = await this.servico.lookupProduto()
  }

  selecaoProduto(e : Event){
    let data = this.dataProdutos.find(i => i.ID_PRODUTO == e)
    this.dataRow.VL_PRODUTO = data.VL_PRODUTO
    this.dataRow.PC_PROMOCAO = 0
    this.dataRow.VL_PROMOCAO = 0
  }

  calcularValor(e : Event){
    let deducao = this.dataRow.VL_PRODUTO * Number(e) / 100
    let valor = this.dataRow.VL_PRODUTO - deducao
    this.dataRow.VL_PROMOCAO = Number((valor).toFixed(2))
  }

  calcularPercentual(e: Event){
    let dif = this.dataRow.VL_PRODUTO - Number(e)
    let pc = dif / this.dataRow.VL_PRODUTO * 100
    this.dataRow.PC_PROMOCAO = Number(pc.toFixed(2))
  }

  produtoGrid(ID_PRODUTO:number){
    return this.dataProdutos.find(i => i.ID_PRODUTO == ID_PRODUTO).NM_PRODUTO
  }

  cancelarRegistro(){
    this.salvarEditando = false
    this.telaRegistro = false

    this.dataRow = {
      ID_PRODUTO  : 0   ,
      VL_PRODUTO  : 0   ,
      PC_PROMOCAO : 0   ,
      VL_PROMOCAO : 0   ,
      SN_ATIVO    : true,
      STATUS      : ''  ,
    }
  }

  salvarRegistro(){
    let duplicado = this.dataGrid.some(i => i.ID_PRODUTO == this.dataRow.ID_PRODUTO)

    if(duplicado){
      this.mensagem = 'Chave Duplicada! (ITENS.ID_PRODUTO)'
      this.aviso.nativeElement.showModal()
      return
    }
    this.dataGrid.push(this.dataRow)
    this.cancelarRegistro()
  }

  excluirRegistro(){
    let index = this.dataGrid.findIndex(i => i.ID_PRODUTO == this.dataRow.ID_PRODUTO)
    this.dataGrid.splice(index, 1)
  }

  editarRegistro(){
    this.dataRow = this.dataGrid.find(i => i.ID_PRODUTO == this.dataRow.ID_PRODUTO)
    this.telaRegistro = true
    this.salvarEditando = true
  }

  alteraRegistro(){
    let item = this.dataGrid.find(i => i.ID_PRODUTO == this.dataRow.ID_PRODUTO)
    item = this.dataRow
    this.cancelarRegistro()
  }

}
