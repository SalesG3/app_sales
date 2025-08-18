import { Component } from '@angular/core';
import { AdminService } from '../../servicos/admin.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  NM_ENTIDADE : string = ''

  constructor(private servico:AdminService, private router:Router){
    if(!servico.ID_ENTIDADE){
      router.navigate(['/admin/login'])
      return
    }

    this.NM_ENTIDADE = servico.NM_ENTIDADE
  }
}
