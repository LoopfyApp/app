export interface Categorys{
	name: string;
	id: string;
	logo: string;
}

export interface LojasRequest{
    id_especie: number|string;
    categorie: number|string;
    distance?: number|string;
    range_value?: RangeValue;
    location: any;
    order: string; // price or distance (ASC)
  }

  export interface RangeValue{
    lower: string;
    upper: string;
  }
  
  export interface storeVeterinary{
    razon: string;
    photo: string;
    id:number|string;
    description: string;
    distance:number
  }
 
  
  export interface ListServiceStoreVeterinary{
    id:number|string;
    description: string;
    name:string;
    price:number;
  }
 
  export  interface DataServiceHours{
    id:number|string;
    fecha: Date; 
    hours:String
  }

  export interface ListCar{
    id_service:number|string;
    description_service: string;
    name_service:string;
    amount:number;
    pets:string;
    pets_photo:string;
    date_service:string;
    hours:string;

  } 
  export  interface DataCart{
    id:number|string;
    cart_number:number|string; 
    total:number
  }
  
  
  export  interface DataCartStore{
    photo:string;
    name:string; 
    razon:string;
  }
  