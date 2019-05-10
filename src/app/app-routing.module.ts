import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth.guard';

import { ContactComponent } from './components/contact/contact.component';
import { FoosballComponent } from './components/foosball/foosball.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SportsComponent } from './components/sports/sports.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'sports', component: SportsComponent, canActivate: [AuthGuard] },
    { path: 'sports', children: [
      { path: '', component: SportsComponent },
      { path: 'foosball', component: FoosballComponent }
    ] },

    // otherwise redirect to home
    { path: '**', redirectTo: '/404' }
];

//export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

