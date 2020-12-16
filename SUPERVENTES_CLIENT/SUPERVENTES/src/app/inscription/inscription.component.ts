import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  public utilisateur = {pseudo: '', email: '', password: ''};
  public message = '';

  constructor(private authService: AuthentificationService, private router: Router) { }


  onSubmit() {
    this.authService.verificationInscription(this.utilisateur).subscribe(reponse => {
      this.message = reponse.message;
      if (reponse.resultat) {
        this.authService.connect(this.utilisateur.email);
        this.router.navigate(['/genres']);
      }
    });
  }
}
