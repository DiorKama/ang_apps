import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent implements OnInit{
produitFormGroup! : FormGroup;
constructor(private fb : FormBuilder, public prodService : ProduitService){

}

  ngOnInit(): void {
     this.produitFormGroup=this.fb.group({
       name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
       price : this.fb.control(null, [Validators.required, Validators.min(200)]),
       promotion : this.fb.control(false, [Validators.required]),
     });
  }

  handleAddProduit(){
   let produit=this.produitFormGroup.value;
   this.prodService.addNewProduit(produit).subscribe({
    next : (data)=>{
     alert("Produit ajouté avec succes");
     this.produitFormGroup.reset();
    }, error : err =>{

    }
   });
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
}
