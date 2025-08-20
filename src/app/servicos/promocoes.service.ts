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
}
