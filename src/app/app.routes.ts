import { Routes } from '@angular/router';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MenuComponent } from './admin/menu/menu.component';
import { CategoriasComponent } from './admin/categorias/categorias.component';
import { ProdutosComponent } from './admin/produtos/produtos.component';
import { PromocoesComponent } from './admin/promocoes/promocoes.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
import { CardapioComponent } from './usuario/cardapio/cardapio.component';
import { PrincipalComponent } from './usuario/principal/principal.component';

export const routes: Routes = [
    {path: ':entidade', component: PrincipalComponent},
    
    {path: 'admin/login', component: AdminloginComponent, pathMatch: 'full'},
    {path: 'admin', component: MenuComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'categorias', component: CategoriasComponent},
        {path: 'produtos', component: ProdutosComponent},
        {path: 'promocoes', component: PromocoesComponent},
        {path: 'perfil', component: PerfilComponent}
    ]}
];
