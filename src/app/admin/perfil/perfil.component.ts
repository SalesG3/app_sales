import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilService } from '../../servicos/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  
  dataRow = {
    IMG_ENTIDADE  : ''  ,
    CD_ENTIDADE   : ''  ,
    NM_ENTIDADE   : ''  ,
    DS_ENTIDADE   : ''  ,
    TEL_ENTIDADE  : ''  ,
    CEL_ENTIDADE  : ''  ,
    EMA_ENTIDADE  : ''  ,
    END_ENTIDADE  : ''  ,
    ALIAS_ENTIDADE: ''
  }

  @ViewChild('aviso') aviso !: ElementRef

  IMG_INPUT       : any
  mensagem        : string = ''
  somenteLeitura  = true

  constructor(private servico : PerfilService){ }

  async ngOnInit() {
    this.dataRow = await this.servico.consultaPerfil()
  }

  async alteraRegistro(){
    let data = await this.servico.alteraPerfil(this.dataRow)

    if(data.sucesso){
      if(this.IMG_INPUT){
        await this.servico.salvarImagem(this.IMG_INPUT)
      }

      this.mensagem = data.mensagem
      this.aviso.nativeElement.showModal()
      this.dataRow = await this.servico.consultaPerfil()
      this.somenteLeitura = true
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

  async cancelarRegistro(){
    this.dataRow = await this.servico.consultaPerfil()
    this.somenteLeitura = true
  }

  tratarImagem(e : Event){
    let input = e.target as HTMLInputElement

    if(input.files){
      this.IMG_INPUT = input.files[0]
    }
  }
  
}
