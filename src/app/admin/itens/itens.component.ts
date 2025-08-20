import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PromocoesService } from '../../servicos/promocoes.service';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent implements OnInit{
  
  dataRow = {
    ID_PRODUTO  : 0   ,
    VL_PRODUTO  : ''  ,
    PC_PROMOCAO : ''  ,
    VL_PROMOCAO : ''  ,
    SN_ATIVO    : true,
  }
  
  dataGrid : Array<any> = []
  dataProdutos : Array<any> = []
  telaRegistro = false

  constructor(private servico : PromocoesService){ }

  async ngOnInit() {
    this.dataProdutos = await this.servico.lookupProduto()
  }

}
