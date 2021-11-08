/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';
import OneSignal from 'onesignal-cordova-plugin'; 
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  constructor(private auth:AuthService,
    private util: UtilsService,
    public platform: Platform,
    private http: HttpClient) { }


    async setupPush(idUser) {
      if(idUser > 0){
      OneSignal.setAppId(environment.idOneSignal);
      let token 
      let datos

      token = (await OneSignal.getDeviceState()).userId;

      datos = { idUser: idUser, token: token, plataforma: 'Sin definir' };

      this.auth.actualizarPush(datos);
      }
      }

  async razasAll(idEspecie) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/razas`, {id_species:idEspecie},{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }      
  }

  async especiesAll() {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/species`, null,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async saveMascote(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/mascote`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async getUser() {
    await this.auth.getHeader();
    try {
   
      return this.http
        .get(`${environment.url}auth/user`, { headers: await this.auth.headers})
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }


  async getUserMascotes() {
    await this.auth.getHeader();
    try {
   
      return this.http
        .get(`${environment.url}auth/user/get/mascotes`, { headers: await this.auth.headers})
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  
  async GetCategories(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/category/services`, {id: data},{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  async GetCategoriesVeterinary(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/category/veterinary`, {id: data},{ headers: await this.auth.headers  })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  async GetLojasServicesVeterinary(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/lojas/veterinary`, data,{ headers: await  this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  async GetLojasServicesVeterinaryList(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/lojas/category/veterinary/services`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }


  
  async getUserMascotesByRaza(id) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .get(`${environment.url}auth/user/get/mascotes/breed/${id}`, { headers: await this.auth.headers})
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  
  async getMascoteDetails(id)
  {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/user/mascotes/`+id, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }   
  }


  

  async GetLojasServicesVeterinaryListData(data) {
 
    await this.auth.getHeader();
 
    try {
      return this.http
        .post(`${environment.url}auth/lojas/service/data`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  async InsertItemCartService(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/lojas/service/data/agendar`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }


  async getListItems(id)
  {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/lojas/service/cart/`+id, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }   
  }

  async deleteItems(cart_id,item_id)
  {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/lojas/service/delete/cart/`+cart_id+'/'+item_id, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  
  async cancelCart(cart_id)
  {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/lojas/service/delete/cart`,{'id_cart':cart_id}, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }


  
  async GetLojasServicesServices(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/lojas/services`, data,{ headers: await  this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  async GetLojasServicesServicesList(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/lojas/category/services`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }     
  }

  
  async GetCep(data) {
    try {
   
      return this.http
        .post(`${environment.url}auth/cep`, {cep:data} )
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }
    
  async GetCnpj(data) {
    try {
   
      return this.http
        .post(`${environment.url}auth/cnpj`,  {cnpj:data} )
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async GetNewcnpj(data) {
    try {
   
      return this.http
        .post(`${environment.url}auth/newcnpj`, {data} )
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }
    
  async Getcpf(data) {
    try {
   
      return this.http
        .post(`${environment.url}auth/newcpf`,  {data} )
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  // REDE SERVICES

  async GetPostAll() {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/posts/all`, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async GetPostPet(id) {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/posts/pets/`+id, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async getPostById(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/posts/`+data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async addPost(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/store`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async LikePost(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/favorite/store`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async UnLikePost(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/favorite/delete`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async getComments(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .get(`${environment.url}auth/posts/comments/`+data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }


  async postComments(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/comments/store`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async deletePost(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/delete`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async GetPostsRecomendacoes() {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/sugestions`,null, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }


  async GetProductsOfferts() {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/products/stores/offerts`,null, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }
 
  async Follow(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/follow/store`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }
  
  async UnFollow(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/follow/delete`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async reportPost(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/reports/store`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }

  async DeleteComment(data) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/posts/comments/delete`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }
  }


 
  async especiesProductCategory(id_specie) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/specie/${id_specie}`, null,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }
  async getProductAll(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/search`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }



  async getProductAllId(idproductos) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/${idproductos}`, null,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }


  async getProductAllIStore(idStore) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/users/store`, {store:idStore},{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async AddProductCart(params) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/add/cart`, params,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async GetLojaProfile(params) {
    await this.auth.getHeader();
    try {
      return this.http
        .post(`${environment.url}auth/products/users/store`, params, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }  

  async DeleteItemProductsCart(params) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/delete/item/cart`, params, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async GetItensProductsCart(params) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/carts/items`, params, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }

  async parcelamiento(data){
    
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/payament/juros`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }  
  }

  async distance(data){
    
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}distance`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }  
  }


  async boletos(data){
    
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/payament/boletos`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }  
  }


  async deletecarproducts(data){
    
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/products/delete/cart`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }  
  }

  async deletepets(data){
    
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/users/delete/pets`, data, { headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }  
  }


  async typeUsers() {
    let user: any
    user = JSON.parse(await this.util.getStorage('user'));
    console.log(user)
    if(user){   return user.type;}
 
  
  }

  async passwordReset(data) {
    await this.auth.getHeader();
    try {
   
      return this.http
        .post(`${environment.url}auth/user/passwordreset`, data,{ headers: await this.auth.headers })
        .toPromise();
    } catch (error) {
      this.auth.handleError(error);
    }    
     
  }


async verifyCode(codigo: string) {
  await this.auth.getHeader();
  try {
 
    return this.http
      .post(`${environment.url}auth/verify`, {codigo:codigo},{ headers: await this.auth.headers  })
      .toPromise();
  } catch (error) {
    this.auth.handleError(error);
  }    
   
}
  
}
