import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
{path : "login", component : LoginComponent},
{path : "", component : LoginComponent},
{path : "admin", component : AdminTemplateComponent, canActivate : [AuthenticationGuard], children : [
  {path : "produits", component : ProduitsComponent},
  {path : "customers", component : CustomersComponent}, 
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
