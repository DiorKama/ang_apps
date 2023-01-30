export interface Produit{
    id : string;
    name : string;
    price : number;
    promotion : boolean;
}

export interface PageProduit{
   produits : Produit[];
   page :number;
   size :number;
   totalPages :number;
}