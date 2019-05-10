import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsProfilesComponent } from './components/teams-profiles/teams-profiles.component';
import { PlayersComponent } from './components/players/players.component';
import {
  MatRippleModule,
  MatInputModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatTooltipModule,
  MatTabsModule,
  MatProgressBarModule,
  MatChipsModule,
  MatToolbarModule,
} from '@angular/material';

export const MatModules = [
  MatRippleModule,
  MatInputModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatTooltipModule,
  MatTabsModule,
  MatProgressBarModule,
  MatChipsModule,
  MatFormFieldModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TeamsProfilesComponent,
    PlayersComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatModules,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
// export class PizzaPartyAppModule { }
export class AppModule { }
