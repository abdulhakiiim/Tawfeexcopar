import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users;
  query;
  isActive: boolean=true;
  error: string;
  errorToken: string;
  constructor(
    private userService: UserService,
    private route: Router
    ) { }

    listData: MatTableDataSource<any>

  displayedColumns: string[] = ['nomComplet','email','roles','status'];

  searchKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    //Récupération de tous les users
    this.userService.getAll()
      .subscribe(
        data =>{
          this.users = data['hydra:member'];
          console.log(this.users);
          this.listData = new MatTableDataSource(this.users);
          console.log(this.listData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        },
        errormsgHttp=>{
          //Fonction pour dumper les données de l'entête de l'API
          console.log(errormsgHttp);
          //Récupération des messages d'erreurs de l'API
          this.error = errormsgHttp.console.error["hydra:description"];
          //Affichage Message Token Expired
          this.errorToken = errormsgHttp.error['message'];

          if(this.errorToken == "Expired JWT Token"){
          alert("Your session has expired ... Please login again from your account");
          return this.route.navigateByUrl('');
           }else{
          alert(this.error); 
          }
        }  
      )
  }

  //Function pour effacer les saisies de la bare de recherche
  onSearchClear(){
    this.searchKey = "";
  }

  //Function pour le filtrage des données
  applyFilter(filterValue:string){
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  //Fonction du changement de status d'un user actif/bloqué
  changeStatus(id, status){
    this.userService.block(id, status)
    .subscribe(
      data => {
        console.log(data);
      }
    )
  }
      
}
