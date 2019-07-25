import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesServices: HeroesService) { }

  ngOnInit() {
    this.heroesServices.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
      });

  }
  /**
   * Delete Heroe
   * @param heroe
   */
  borrarHeroe(heroe: Heroe, i: number) {

    Swal.fire({
      title: '',
      text: `Está seguro de eliminar ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value === true){
      this.heroesServices.deleteHeroe(heroe.key$)
        .subscribe(res => {
          this.heroes.splice(i, 1);
        });
      }
    })


  }

}
