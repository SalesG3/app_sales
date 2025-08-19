import { Routes } from '@angular/router';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MenuComponent } from './admin/menu/menu.component';
import { CategoriasComponent } from './admin/categorias/categorias.component';
import { ProdutosComponent } from './admin/produtos/produtos.component';

export const routes: Routes = [
    {path: '', redirectTo: '/admin/login' , pathMatch: 'full'},
    {path: 'admin/login', component: AdminloginComponent, pathMatch: 'full'},
    {path: 'admin', component: MenuComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'categorias', component: CategoriasComponent},
        {path: 'produtos', component: ProdutosComponent}
    ]}
];
