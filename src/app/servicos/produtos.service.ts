import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  headers = {
    TOKEN: environment.TOKEN,
    "Content-Type":"application/json"
  }

  constructor(private sessao:AdminService) { }

  async codigoProduto(){

    let request = await fetch(environment.API + `produtos/${this.sessao.ID_ENTIDADE}/codigo`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0].CD_PRODUTO
  }

  async lookupCategoria(){

    let request = await fetch(environment.API + `categorias/${this.sessao.ID_ENTIDADE}/lookup`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async salvarProduto(dataRow : object){

    let request = await fetch(environment.API + `produtos/${this.sessao.ID_ENTIDADE}/insert`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }

  async gridProduto(){
    
    let request = await fetch(environment.API + `produtos/${this.sessao.ID_ENTIDADE}/grid`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async consultaProduto(ID_PRODUTO:number){

    let request = await fetch(environment.API+`produtos/${ID_PRODUTO}/consulta`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0]
  }
}
