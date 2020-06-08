import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //Fonction pour la récupération des users
  getAll(){
      return this.http.get<any>(`${environment.apiUrl}/api/users`);
  }

  //Fonction pour la création d'un user
  registrer(data: any){
      return this.http.post<any>(`${environment.apiUrl}/api/users`, data);
  }


  block(id,status){
      return this.http.put<any>(`${environment.apiUrl}/api/users/${id}`, {"isActive": status});
  }
}
