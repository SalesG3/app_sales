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
  @ViewChild('aviso') aviso !: ElementRef

  mensagem : string = ''
  dataCategorias : Array<any> = []

  constructor( private servico : ProdutosService){ }

  async incluirRegistro(){
    this.dataRow.CD_PRODUTO = await this.servico.codigoProduto()
    this.dataCategorias = await this.servico.lookupCategoria()
    this.modal.nativeElement.showModal()
  }

  cancelarRegistro(){
    this.modal.nativeElement.close()
    this.dataRow = {
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
  }

  async salvarRegistro(){
    let data = await this.servico.salvarProduto(this.dataRow)
    console.log(this.dataRow.IMG_PRODUTO)

    if(data.sucesso){
      this.mensagem = data.mensagem
      this.cancelarRegistro()
      this.aviso.nativeElement.showModal()
    }
    else{
      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
    }
  }

  async fecharAviso(){
    this.aviso.nativeElement.close()
    this.mensagem = ''
  }


  tratarImagem(e : Event){
    let input = e.target as HTMLInputElement
    let reader = new FileReader()

    if(input.files && input.files.length > 0){
      reader.onload = () => {
        this.dataRow.IMG_PRODUTO = reader.result as string
      }

      reader.readAsDataURL(input.files[0])
      console.log(this.dataRow.IMG_PRODUTO)
    }
  }
}
