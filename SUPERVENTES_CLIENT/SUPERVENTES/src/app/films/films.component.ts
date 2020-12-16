import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmsService } from '../films.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  public user: Observable<string>;
  public films: Object[] = new Array();

  public titres: Object[] = new Array();
  public genres: Object[] = new Array();
  public prix: Object[] = new Array();
  public annees: Object[] = new Array();
  public durees: Object[] = new Array();
  public descriptions: Object[] = new Array();

  constructor(private route: ActivatedRoute,
              private authService: AuthentificationService,
              private filmsService: FilmsService) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.genre !== undefined) {
        this.filmsService.getFilmsParGenre(params.genre).subscribe(films => {
          this.films = films;
        });
      }
      else {
        this.filmsService.getFilms().subscribe(films => {
          this.films = films;
          this.titres = films.titre;
          this.genres = films.genre;
          this.prix = films.prix;
          this.annees = films.année;
          this.durees = films.durée;
          this.descriptions = films.description;
        });
      }
    });
  }

  getAttFilms(att) {
    return this.filmsService.getAttributFilms(att).subscribe(e => { return e } );
  }
}
