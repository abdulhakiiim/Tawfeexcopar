import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService

  ) { 

    //rediriger vers la page d'accueil si l'user déjà connecté
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      //obtenir l'url de retour des paramètres de route ou par défaut '/home'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  
  // getter pratique pour un accès facile aux champs de formulaire
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
  
  const username = this.loginForm.value.username;
  let password = this.loginForm.value.password; 

      this.submitted = true;

      // réinitialiser les alertes lors de la soumission
      this.alertService.clear();

      //arrêtez-vous ici si le formulaire n'est pas valide
      if (this.loginForm.invalid) {
          return;
      }


      this.loading = true;
      this.authenticationService.login({ username, password })
          
          .subscribe(
              data => {
                  console.log(data);
                  this.router.navigate([this.returnUrl])
              },
              error => {
                    this.alertService.error(error);
                    this.loading = false;
              });

          
  }
}
