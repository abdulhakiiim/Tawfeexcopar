import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';



@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  //Fonction de récupération des roles
  findRoles(){
    return this.http.get<Role[]>(`${environment.apiUrl}/api/roles`);
  }

}
