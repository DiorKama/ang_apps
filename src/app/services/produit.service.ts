import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Produit, PageProduit } from '../model/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private produits! : Array<Produit>

  constructor() {
    this.produits =[
      {id:UUID.UUID(), name : "Computer", price : 6500, promotion:true},
      {id:UUID.UUID(), name : "Imprimente", price : 1200, promotion:false},
      {id:UUID.UUID(), name : "Smartphone", price : 1400, promotion:true},
];
for (let i = 0; i < 10; i++){
         this.produits.push({id:UUID.UUID(), name : "Computer", price : 6500, promotion:true});
         this.produits.push({id:UUID.UUID(), name : "Imprimente", price : 1200, promotion:false});
         this.produits.push({id:UUID.UUID(), name : "Imprimente", price : 1200, promotion:false});
    }
   }
   public getAllProduits() : Observable<Array<Produit>>{
    let rnd=Math.random();
    if(rnd<0.1) return throwError(()=>new Error("erreur connection internet am na"));
    else return of([...this.produits]);
   }

   public getPageProduits(page : number, size : number) : Observable<PageProduit>{
    let index = page*size;
    let totalPages = ~~(this.produits.length/size);
    if(this.produits.length % size !=0)
    totalPages++;
    let pageProduits = this.produits.slice(index,index+size);
    return of({page:page, size:size, totalPages:totalPages, produits : pageProduits});
    
   
   }

   public deleteProduit(id : string) : Observable<boolean> {
    this.produits = this.produits.filter(p=>p.id!=id);
    return of(true);
   }

   public setPromotion(id : string) : Observable<boolean> {
    let produit = this.produits.find(p=>p.id==id);
    if(produit !=undefined){
      produit.promotion=!produit.promotion;
      return of(true); 
    }else return throwError(()=>new Error("Produit non trouvé"));
    
   }

   public searchProduits(Rechercher :string, page : number, size : number) : Observable<PageProduit>{
    let result = this.produits.filter(p=>p.name.includes(Rechercher));
    let index = page*size;
    let totalPages = ~~(result.length/size);
    if(this.produits.length % size !=0)
    totalPages++;
    let pageProduits = result.slice(index,index+size);
    return of({page:page, size:size, totalPages:totalPages, produits : pageProduits});
   

   }

   public addNewProduit(produit : Produit) : Observable<Produit>{
    produit.id=UUID.UUID();
    this.produits.push(produit);
    return of(produit);
   }

   public getProduit(id : string) : Observable<Produit>{
    let produit = this.produits.find(p=>p.id==id);
    if(produit ==undefined)
    return throwError(()=>new Error("Produit non trouvé"));
    return of(produit);
   }

   getErrorMessage(fieldName : string, error : ValidationErrors){
    if(error['required']){
     return fieldName + " est obligatoire";

    }else if(error['minlength']){
     return fieldName + " devrait avoir au moins " + error['minlength'] ['requiredLength'] + " Caracter";
    
   }else if(error['min']){
     return fieldName + " devrait avoir une valeur minimal " + error['min'] ['min'];
    }

    else return "";
 }

 public updateProduit(produit : Produit) : Observable<Produit>{
  this.produits=this.produits.map(p=>(p.id==produit.id)?produit:p);
  return of(produit);
 }
}
