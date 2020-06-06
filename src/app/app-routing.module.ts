import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersManagementComponent } from './_components/users-management/users-management.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './_components/login/login.component';
import { MyDashboardComponent } from './_components/my-dashboard/my-dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: MyDashboardComponent },
  { path: 'users-management', canActivate: [AuthGuard], component: UsersManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
