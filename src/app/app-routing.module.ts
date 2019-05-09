import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', canActivate: [AuthGuard], component: AppComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '/404' }
];

//export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

