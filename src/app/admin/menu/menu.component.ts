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
  NM_ENTIDADE : string = ''

  constructor(private servico:AdminService, private router:Router){
    
    this.NM_ENTIDADE = servico.NM_ENTIDADE
  }

  ngOnInit(): void {
    console.log(this.servico.ID_ENTIDADE)
    if(!this.servico.ID_ENTIDADE){
      this.router.navigate(['/admin/login'])
      
      return
    }
  }
}
