import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  dataRow = {
    CD_PRODUTO  : ''    ,
    SN_ATIVO    : true  ,
  }

}
