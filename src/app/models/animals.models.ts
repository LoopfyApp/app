export interface RazasApp {
    id: number|string;
    logo: string; 
    name: string; 
  }

  export interface Mascote{
    id: number|string;
    photo: string; 
    name: string; 
    id_raza: number|string;
    id_species: number|string;
    description: string; 
    specrazaes: string;  
    breed:RazasApp;
    species:EspeciesApp;
    genero:number|string;
    identification:number|string;
    vaccines:number|string;
    castrated:number|string;
    birthday:string;
    size:number|string;
    users_id:number;
  }

  export interface EspeciesApp {
    id: number|string;
    logo: string; 
    name: string;
  }