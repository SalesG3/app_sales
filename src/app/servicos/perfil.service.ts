import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  constructor(private sessao : AdminService) { }

  async consultaPerfil(){

    let request = await fetch(environment.API + `entidades/${this.sessao.ID_ENTIDADE}/consulta`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0]
  }

  async alteraPerfil(dataRow : object){
    
    let request = await fetch(environment.API + `entidades/${this.sessao.ID_ENTIDADE}/altera`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }

  async salvarImagem(IMG_ENTIDADE : File){

    let formData = new FormData()

    formData.append('file', IMG_ENTIDADE)

    let request = await fetch(environment.API + `entidades/${this.sessao.ID_ENTIDADE}/imagem`, {
      method: "POST",
      headers: {
        token: environment.TOKEN
      },
      body: formData
    })

    let data = await request.json()

    return data
    
  }
}