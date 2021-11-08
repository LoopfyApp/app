import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserMain } from '../models/users.models';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userD: LoginUserMain;
  token;
  isLoggedIn = false;
  headers;
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  

  constructor(
    private http: HttpClient,
    private util: UtilsService,
    private router: Router,
  ) {  

  
  this.loadFromLocal()

  this.currentUserSubject.subscribe((user) => {
    this.userD = user;
  });

}
 

async login(data) {
  return this.http.post(environment.url + "auth/login", data).toPromise();
}

async loadFromLocal() {
  try {
    console.log("auth load from local storage user");
    let user = JSON.parse(await this.util.getStorage("user"));
    
    if (user && user != undefined) {
      this.currentUserSubject.next(user);
    }
  } catch (error) {
    console.log("error auth load from local storage user", error);
    this.router.navigate(["/login"], { replaceUrl: true });
  }
}

setAuth(user, token: string, token_type:string, persist = true) {
 
  
  if (typeof user == "string") user = JSON.parse(user);

  if (this.userD && user && token)
    user["tokenapi"] = token;
  if (persist) {

    this.util.setStorage("remember" , true);
    this.util.setStorage("user", JSON.stringify(user));
    this.util.setStorage("token" , token);
    this.util.setStorage("token_type" , token_type);

    
  }

  this.currentUserSubject.next(user);
}

get user(): Observable<any> {
  return this.currentUserSubject;
}

get userBehaviorSubject(): BehaviorSubject<LoginUserMain> {
  return this.currentUserSubject;
}

async getUserData() {
  if (this.userD == undefined || this.userD == null)
    this.userD = await this.util.getStorage("user");
  if (typeof this.userD == "string") this.userD = JSON.parse(this.userD);
  console.log(this.userD)
  return this.userD;
}

async usersId() {
  let userid: any
    userid = await this.util.getStorage("user");
    if(userid !== null ){

      userid=JSON.parse(userid)
      return userid.id
    }
    return 0

} 

async refreshUser(user) {


  this.util.setStorage("user", JSON.stringify(user));
  this.currentUserSubject.next(user);
  
}


logOut() {
  this.headers = null;
  this.token = null;
  this.util.removeStorage('user');
  this.util.removeStorage('token');
  this.util.removeStorage('token_type');
  this.util.removeStorage('animales');
  this.util.removeStorage('add_cart');
  this.util.removeStorage('CART_PRODUCTS_ID');
  this.currentUserSubject.next(null);
  this.router.navigate(["/login"], { replaceUrl: true });
}


handleError(error) {
  console.log("error en deService handleError", error);

  let errorMessage = "";
  if (error.error instanceof ErrorEvent) {
    console.log("es error del evento ErrorEvent");
    errorMessage = `Error: ${error.error.message}`;
  } else {
    if (error.error.error instanceof Object) {
      console.log("el error es Objeto error.error.error instanceof Object");
      for (let x in error.error.error) {
        errorMessage += error.error.error[x] + " ";
      }
    } else {
      if (error.error.error) errorMessage = error.error.error;
      else {
        if (error.error instanceof Object) {
          console.log("el error es Objeto error.error instanceof Object");

          if (error.status != 401) {
            errorMessage =
              "Ha ocurrido un error inesperado " +
              error.status +
              error.statusText;
          } else {
            for (let x in error.error) {
              errorMessage += error.error[x] + " ";
            }
          }
        } else errorMessage = "Ha ocurrido un error inesperado.";
      }
    }
  }

}

async signup(data) {
  return this.http.post(environment.url + "register", data).toPromise();
}


async getHeader() {
  let headersConfig = { };

  if (this.token) {
    headersConfig["Authorization"] = `Bearer ${this.token}`;
  } else {
    const token = await this.getToken();
    if (token) headersConfig["Authorization"] = `Bearer ${this.token}`;
  }
  this.headers = headersConfig;
 
  return headersConfig;
}

 

async setToken(token = "") {
  this.token = token;
  await this.util.setStorage("token", token);
}


async resendCode() {
  await this.getHeader();
  try {
 
    return this.http
      .post(`${environment.url}auth/resend`, null,{ headers: await this.headers })
      .toPromise();
  } catch (error) {
    this.handleError(error);
  }    
   
}

  
async CancelUser() {
  await this.getHeader();
  try {
 
    return this.http
      .post(`${environment.url}auth/CancelUser`, null,{ headers: await this.headers })
      .toPromise();
  } catch (error) {
    this.handleError(error);
  }    
   
}
 
async getToken() {
  this.token = await this.util.getStorage("token");
  console.log(this.token)
  return this.token;
}

async reset(data){
  try {
    return this.http.post(environment.url + "reset", data).toPromise();
 
  } catch (error) {
    this.handleError(error);
  }  
}

async actualizarPush(data) {
 
  try {
 
    return this.http
      .post(`${environment.url}auth/tokenPush`, data)
      .toPromise();
  } catch (error) {
    this.handleError(error);
  }    
   
}

}