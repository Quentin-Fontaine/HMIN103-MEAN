import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService } from './authentification.service';
import { FilmsService } from './films.service';

import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FilmsComponent } from './films/films.component';
import { GenresComponent } from './genres/genres.component';
import { MenuComponent } from './menu/menu.component';
import { PanierComponent } from './panier/panier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    FilmsComponent,
    GenresComponent,
    MenuComponent,
    PanierComponent,
    InscriptionComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthentificationService, FilmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
