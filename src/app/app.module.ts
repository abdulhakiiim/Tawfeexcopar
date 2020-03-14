import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './_core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginpageComponent } from './_pages/loginpage/loginpage.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginpageComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
