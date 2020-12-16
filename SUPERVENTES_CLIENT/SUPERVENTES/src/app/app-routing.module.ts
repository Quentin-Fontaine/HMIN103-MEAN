import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GenresComponent } from './genres/genres.component';
import { FilmsComponent } from './films/films.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: 'membres/connexion',
    component: ConnexionComponent
  },
  { path: 'membres/inscription',
    component: InscriptionComponent
  },
  { path: 'genres',
    component: GenresComponent
  },
  { path: 'films/:genre',
    component: FilmsComponent
  },
  { path: 'films',
    component: FilmsComponent
  },
  { path: 'panier/:user',
    component: PanierComponent
  },
  {
    path: 'panier/:user/achat/:titre',
    component: PanierComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
