import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  alias : string = ''

  constructor() { }

  async consultaDados(){

    let request = await fetch(environment.API+`cardapio/${this.alias}/dados`, {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }
}
