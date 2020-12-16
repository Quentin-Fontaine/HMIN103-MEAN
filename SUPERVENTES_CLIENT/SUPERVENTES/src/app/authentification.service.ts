import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Methods': 'GET,POST',
    'Access-Control-Allow-Headers': 'Content-type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public user: Subject<string> = new BehaviorSubject<string>('');
  public urlBase = 'http://localhost:8888/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.urlBase + 'membres');
  }

  getUser() {
      return this.user;
  }
  connect(data: string) {
      this.user.next(data);
  }
  disconnect() {
      this.user.next('');
  }

  verificationConnexion(identifiants: any): Observable<any> {
      return this.http.post(this.urlBase + 'membre/connexion', JSON.stringify(identifiants), httpOptions);
  }

  verificationInscription(identifiants: any): Observable<any> {
      return this.http.post(this.urlBase + 'membre/inscription', JSON.stringify(identifiants), httpOptions);
  }
}
