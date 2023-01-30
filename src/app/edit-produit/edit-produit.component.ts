import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit{
  
 produitId! : string;
 produit! : Produit;
 produitFormGroup! : FormGroup;
  constructor(private route : ActivatedRoute, public prodService : ProduitService, private fb : FormBuilder){
   this.produitId=this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
     this.prodService.getProduit(this.produitId).subscribe({
      next :(produit)=>{
      this.produit=produit;
      this.produitFormGroup=this.fb.group({
        name : this.
        fb.control(this.produit.name, [Validators.required, Validators.minLength(4)]),
        price : this.fb.control(this.produit.price, [Validators.required, Validators.min(200)]),
        promotion : this.fb.control(this.produit.promotion, [Validators.required]),
      });
      },
      error : (err)=>{

      }
     });
  }

  handleUpdateProduit(){
   let p = this.produitFormGroup.value;
   p.id=this.produit.id;
   this.prodService.updateProduit(p).subscribe({
    next : (prod)=>{
      alert("Produit modifié avec succes")
    },
    error : err =>{
      console.log(err);
    }
   });
  }
}
