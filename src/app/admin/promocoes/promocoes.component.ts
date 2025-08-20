import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItensComponent } from '../itens/itens.component';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [FormsModule, ItensComponent],
  templateUrl: './promocoes.component.html',
  styleUrl: './promocoes.component.css'
})
export class PromocoesComponent {

  dataRow = {
    ID_PRODUTO  : 0   ,
    CD_PRODUTO  : ''  ,
    DT_INICIO   : ''  ,
    DT_FINAL    : ''  ,
    NM_PROMOCAO : ''  ,
    DS_PROMOCAO : ''  ,
  }

  @ViewChild('modal') modal !: ElementRef

  constructor(){}

  incluirRegistro(){
    this.modal.nativeElement.showModal()
  }

}
