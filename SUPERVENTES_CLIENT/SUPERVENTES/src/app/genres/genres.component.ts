import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { FilmsService } from '../films.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  public user: Observable<string>;
  public genres: String[] = new Array();

  constructor(private router: Router,
              private authService: AuthentificationService,
              private filmsService: FilmsService) {
    this.user = this.authService.getUser();
  }
  
  ngOnInit() {
    this.filmsService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }
  
  filmsParGenre(genre) {
    this.router.navigate(['/films', genre]);
  }
}
