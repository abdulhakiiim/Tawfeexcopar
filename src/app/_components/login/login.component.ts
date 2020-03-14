import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators'
import { User } from 'src/app/_models/user';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
    loading = false;
    submitted = false;
    returnUrl: string;
   

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService

  ) { 
      //redirect to home if already logged in
      if(this.authenticationService.currentUserValue){
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      //get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
   
  const username = this.loginForm.value.username;
  let password = this.loginForm.value.password; 

      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
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
