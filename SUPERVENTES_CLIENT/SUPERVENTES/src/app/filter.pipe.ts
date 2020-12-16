import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(valeurs: any, rec: any, attribut: string): any {
    let recherche = rec;
    if(rec instanceof Array){
      recherche = "";
    }
    if (recherche) {
      return valeurs.filter(val => {
        let res = val[attribut].toString().toLowerCase();
        return res.indexOf(recherche.toString().toLowerCase()) >= 0;
      });
    } else {
      return valeurs;
    }
  }
}
