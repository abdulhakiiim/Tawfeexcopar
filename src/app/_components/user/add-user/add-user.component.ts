import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../../_services/role.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { first } from 'rxjs/operators';
import { Role } from '../../../_models/role';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    registerForm: FormGroup;
    role: Role[]
    error: string;
    errorToken: string;
    submitted = false;
    iri = `/api/roles`

  constructor(
      private roles:RoleService,
      private router:Router,
      private userService:UserService,
      private alertService:AlertService,
      private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    //Recupération des roles au chargement du component
    this.roles.findRoles().subscribe((data: Role[])=>{
      console.log(data)
      this.role = data['hydra:member']
    });

    //Recupération des données user avec FormGroup
    this.registerForm = this.formBuilder.group({
      nomComplet: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, 
                              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', Validators.required),
      userRole: new FormControl('', Validators.required)
    });
  }

    //Fonction de control des fields
    get f(){ return this.registerForm.controls; }

    onSubmit(){
      this.submitted = true;

      //Réinitialiser les alertes
      this.alertService.clear();

      if(this.registerForm.invalid){
         return;
      }

      //Recupération des alertes
      this.userService.registrer(this.registerForm.value)
          .pipe(first())
          .subscribe(
            data=>{
              console.log(data);
            },
            error=>{
              this.alertService.error(error);
            });
    }

    //Fonction d'ajout user
    onRegister(){

      //Substituer la valeur du libelle en iri
      console.log(this.registerForm.value);
      this.registerForm.value.userRole = this.registerForm.value.userRole['@id']
      console.log(this.registerForm.value.userRole);

      //Création user
      this.userService.registrer(this.registerForm.value)
          .subscribe(
            data=>{
              console.log(data);
              if(data){
                alert("User successfully added ...")
              }
            },
            errorHttp=>{
              console.log(errorHttp);

              //Recupération des messages d'erreurs
              this.error = errorHttp.error["hydra:description"];

              //Affichage message token expiré
              this.errorToken = errorHttp.error['message'];

              if(this.errorToken == "Expired JWT Token"){
                alert("Your session has expired. Please reconnect!");
                  return this.router.navigateByUrl('');
              }else{
                //Afficher le message d'erreur
                alert(this.error);
              }
              
              
            }
          )

    }

}
