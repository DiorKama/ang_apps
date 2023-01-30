import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NewProduitComponent } from './new-produit/new-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    NewProduitComponent,
    EditProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
