import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  headers = {
    "Content-Type":"application/json",
    token: environment.TOKEN
  }

  constructor(private sessao:AdminService) { }

  async codigoCategoria(){

    let request = await fetch(environment.API+`categorias/${this.sessao.ID_ENTIDADE}/codigo`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()
    
    return data
  }

  async insertCategoria(dataRow:object){
    
    let request = await fetch(environment.API+`categorias/${this.sessao.ID_ENTIDADE}/insert`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }

  async gridCategoria(){
    
    let request = await fetch(environment.API+`categorias/${this.sessao.ID_ENTIDADE}/grid`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async consultaCategoria(ID_CATEGORIA : number){

    let request = await fetch(environment.API + `categorias/${ID_CATEGORIA}/consulta`, {
      method: "GET" ,
      headers: this.headers
    })

    let data = await request.json()

    return data[0]
  }

  async deleteCategoria(ID_CATEGORIA : number){

    let request = await fetch(environment.API + `categorias/${ID_CATEGORIA}/delete`, {
      method: "DELETE",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async alteraCategoria(dataRow : object, ID_CATEGORIA : number){

    let request = await fetch(environment.API + `categorias/${ID_CATEGORIA}/altera`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }
}
