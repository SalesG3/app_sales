import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AdminService } from '../../servicos/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  dataRow = {
    CD_ENTIDADE : ''  ,
    USER_SENHA  : ''
  }

  mensagem : string = ''

  constructor(private servico:AdminService, private router:Router){ }

  async adminLogin(){
    this.mensagem = ''
    let data = await this.servico.loginAdmin(this.dataRow)

    if(data.sucesso){
      this.router.navigate(['/admin/dashboard'])
    }
    else{
      this.mensagem = data.mensagem
    }
  }
}
