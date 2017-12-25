import { Routes ,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { CascadeDropdownComponent } from './cascade-dropdown/cascade-dropdown.component';


const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'home',
    component: HomeComponent,
    
  },
  {
    path: 'contact/:id',
    component: AccountComponent,
    
  },
  {
    path: 'contact',
    component: AccountComponent,
    
  },
   {
    path: 'contactlist',
    component: ContactListComponent,
    
  },
  
   {
    path: 'cascade-dropdown',
    component: CascadeDropdownComponent,
    
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];



export const appRouterModule = RouterModule.forRoot(routes);

