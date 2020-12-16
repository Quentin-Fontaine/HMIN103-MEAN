import { Injectable } from '@angular/core';
import { IHttpClient, HttpHeaders } from '@angular/common/http';
import { ISubject, BehaviorSubject } from 'rxjs';
import { IObservable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private user:Subject<string> = new BehaviorSubject<string>(undefined);
  private urlBase: string = "http://localhost:8888/";

  constructor(private http: HttpClient) { }

  getUsers() { return this.http.get(this.urlBase+'membres'); }

  getUser() { return this.user; }

  connect(data: string) { this.user.next(data); }

  disconnect() { this.user.next(null); }

  verificationConnexion(identifiants): Observable<any> {
    return this.http.post(this.urlBase+'membre/connexion',
                          JSON.stringify(identifiants), httpOptions);
  }
}
