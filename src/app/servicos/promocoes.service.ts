import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PromocoesService {
  headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  constructor(private sessao : AdminService) { }

  async lookupProduto(){

    let request = await fetch(environment.API + `produtos/${this.sessao.ID_ENTIDADE}/lookup`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async codigoPromocao(){

    let request = await fetch(environment.API + `promocoes/${this.sessao.ID_ENTIDADE}/codigo`,{
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0].CD_PROMOCAO
  }

  async salvarPromocao(dataRow : object, dataItens : Array<any>){

    let body = Object.assign(dataRow, {ITENS: dataItens})

    let request = await fetch(environment.API + `promocoes/${this.sessao.ID_ENTIDADE}/insert`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    })

    let data = await request.json()

    return data
  }

  async gridPromocoes(){

    let request = await fetch(environment.API + `promocoes/${this.sessao.ID_ENTIDADE}/grid`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async deletePromocao(ID_PROMOCAO : number){

    let request = await fetch(environment.API + `promocoes/${ID_PROMOCAO}/delete`, {
      method: "DELETE",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async consultaPromocao(ID_PROMOCAO : number){

    let request = await fetch(environment.API + `promocoes/${ID_PROMOCAO}/consulta`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async alteraPromocao(dataRow : object, dataItens : Array<any>, ID_PROMOCAO : number){

    let body = Object.assign(dataRow, {ITENS: dataItens})

    let request = await fetch(environment.API + `promocoes/${ID_PROMOCAO}/altera`,{
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body)
    })

    let data = await request.json()

    return data
  }
}
