import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styles: []
})
export class HeroeComponent implements OnInit {
  private heroe: Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel"
  };

  nuevo: boolean = true;
  id: string;

  constructor(
    private router: Router,
    private heroeServices: HeroesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros["id"];

      if (this.id !== "nuevo") {
        this.heroeServices.getHeroe(this.id).subscribe(
          data => {
            this.heroe = data;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  ngOnInit() { }

  /**
   * Safe the data of Heroe
   */
  guardar() {
    let peticion: Observable<any>;
    if (this.id === "nuevo") {
      // insertar
      peticion = this.heroeServices.nuevoHeroe(this.heroe);
    } else {
      // actualizar
      peticion = this.heroeServices.actualizarHeroe(this.heroe, this.id);
    }

    peticion.subscribe(
      data => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actulizó correctamente',
          type: 'success'
        }).then(resp => {
          if (data.name) {
            this.router.navigate(["/heroe", data.name]);
          }
        })
      },
      error => {
        console.log(error);
      }
    );

  }
  /**
   * Navigate to the page insert new heroe
   * @param forma
   */
  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/heroe", "nuevo"]);

    forma.reset({
      casa: "Marvel"
    });
  }
}
