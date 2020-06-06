import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tawfeexcopar';
  currentUser: User;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private breakpointObserver: BreakpointObserver
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(){
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
