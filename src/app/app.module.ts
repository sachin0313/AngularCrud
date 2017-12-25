import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { appRouterModule } from "./app.routes";

import { AccountComponent } from './account/account.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CascadeDropdownComponent } from './cascade-dropdown/cascade-dropdown.component';

@NgModule({
  
  imports: [
    BrowserModule,FormsModule,HttpModule,appRouterModule
  ],
  declarations: [
    AppComponent,
    AccountComponent,
    ContactListComponent,
    NavComponent,
    HomeComponent,
    CascadeDropdownComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
