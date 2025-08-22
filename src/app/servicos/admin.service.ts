import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers = {
    "Content-Type":"application/json",
    TOKEN: environment.TOKEN
  }

  constructor() { }

  ID_ENTIDADE   = 0
  NM_ENTIDADE   = ''
  IMG_ENTIDADE  = ''

  async loginAdmin(dataRow:object){

    let request = await fetch(
      environment.API + "admin/login", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_ENTIDADE  = data.ID_ENTIDADE
      this.NM_ENTIDADE  = data.NM_ENTIDADE
      this.IMG_ENTIDADE = data.IMG_ENTIDADE
    }

    return data
  }
}
