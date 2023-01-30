import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../model/produit.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits! : Array<Produit>;
  currentPage : number=0;
   pageSize:number = 5;
   totalPages : number = 0;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  constructor(private produitService : ProduitService, private fb : FormBuilder, public authService : AuthenticationService, private router : Router ) {}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
    Rechercher : this.fb.control(null)  
    });
    this.handleGetPageProduits();
      
  }
  // handleGetAllProduits(){
  //   this.produitService.getAllProduits().subscribe({
  //     next : (data)=>{
  //       this.produits=data;
  //     },
  //     error : (err)=> {
  //       this.errorMessage=err;
  
  //     }
  //   });
  // }

  handleGetPageProduits(){
    this.produitService.getPageProduits(this.currentPage, this.pageSize).subscribe({
      next : (data)=>{
        this.produits=data.produits;
        this.totalPages=data.totalPages;
      },
      error : (err)=> {
        this.errorMessage=err;
  
      }
    });
  }

  handleDeleteProduit(p: Produit){
    let conf=confirm("Etes vous sur de vouloir supprimer");
    if(conf==false) return;
   this.produitService.deleteProduit(p.id).subscribe({
    next : (data)=>{ 
      // this.handleGetAllProduits();
      let index=this.produits.indexOf(p);
      this.produits.splice(index, 1);
    }
   })
  }
  handleSetPromotion(p: Produit){
    let promo=p.promotion;
     this.produitService.setPromotion(p.id).subscribe({
      next :(data)=>{
       p.promotion=!promo; 
      },
      error : err =>{
        this.errorMessage=err;
      }
     })
  }
  handleSearchProduits(){
    this.currentAction="search";
    this.currentPage=0;
   let Rechercher=this.searchFormGroup.value.Rechercher;
   this.produitService.searchProduits(Rechercher, this.currentPage, this.pageSize).subscribe({
    next :(data)=>{
      this.produits=data.produits;
      this.totalPages = data.totalPages;
    }
   })

  }
  gotoPage(i: number){
      this.currentPage=i;
      if(this.currentAction=='all')
      this.handleGetPageProduits();
      else
      this.handleSearchProduits();  
  }

  handleNewProduit(){
    this.router.navigateByUrl("/admin/newProduit");
  }

  handleEditProduit(p: Produit){
   this.router.navigateByUrl("/admin/editProduit/"+p.id); 
  }
}
