import { Component, OnInit } from '@angular/core';
import { CardapioService } from '../../servicos/cardapio.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  dataCategorias  : Array<any> = []
  dataProdutos    : Array<any> = []
  dataPromocoes   : Array<any> = []

  constructor(private servico : CardapioService, private acesso : ActivatedRoute){ }

  async ngOnInit() {
    this.servico.alias = this.acesso.snapshot.params['entidade']

    let data = await this.servico.consultaDados()

    this.dataCategorias = data.CATEGORIAS
  }

}
