import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

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

      if ( this.id !== "nuevo" ){
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

  ngOnInit() {}

  guardar() {
    if (this.id === "nuevo") {
      // insertar
      this.heroeServices.nuevoHeroe(this.heroe).subscribe(
        data => {
          this.router.navigate(["/heroe", data.name]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      // actualizar
      this.heroeServices.actualizarHeroe(this.heroe, this.id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
