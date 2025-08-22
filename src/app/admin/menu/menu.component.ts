import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../servicos/admin.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  NM_ENTIDADE  : string = ''
  IMG_ENTIDADE : string = ''

  constructor(private servico:AdminService, private router:Router){
    
    this.NM_ENTIDADE = servico.NM_ENTIDADE
    this.IMG_ENTIDADE = servico.IMG_ENTIDADE
  }

  ngOnInit(): void {
    if(!this.servico.ID_ENTIDADE){
      this.router.navigate(['/admin/login'])
      
      return
    }
  }
}
