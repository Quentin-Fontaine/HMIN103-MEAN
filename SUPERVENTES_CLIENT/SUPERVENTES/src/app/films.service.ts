import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FilmsService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any> {
    return this.http.get(this.urlBase+'films');
  }
  
  getAttributFilms(att): Observable<any> {
    return this.http.get(this.urlBase+'films/'+att);
  }

  getFilmsParGenre(genre): Observable<any> {
    return this.http.get(this.urlBase+'films/'+genre);
  }

  getGenres(): Observable<any> {
    return this.http.get(this.urlBase+'genres');
  }
}
