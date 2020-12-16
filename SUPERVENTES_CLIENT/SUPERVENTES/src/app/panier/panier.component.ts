import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { FilmsService } from '../films.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  public paniers: Array<{email: string, filmsList: Array<{titre: string, quantity: number}>}> = new Array();
  public user: Observable<string>;

  constructor(private authService: AuthentificationService) {
    this.user = this.authService.getUser();
    this.authService.getUsers().subscribe(users => {
      for (const u of users){
        this.paniers.push({email: u.email, filmsList: new Array()});
      }
    });
  }

  ngOnInit(): void {

  }

  getPanier(user): any {
    if ( this.paniers.find(element => element.email === user).filmsList === undefined ) {
      return new Array();
    }
    else {
      return this.paniers.find(element => element.email === user).filmsList;
    }
  }

  addToPanier(user, title): void {
    if (this.paniers.find(element => element.email === user).filmsList.find(element => element.titre === title) === undefined) {
      this.paniers.find(element => element.email === user).filmsList.push({titre: title, quantity: 1});
    }
    else {
      this.paniers.find(element => element.email === user).filmsList.find(element => element.titre === title).quantity =
      this.paniers.find(element => element.email === user).filmsList.find(element => element.titre === title).quantity + 1 ;
    }
  }
}
