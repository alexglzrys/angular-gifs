import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /**
   * ViewChild nos permite hacer referencia a un elemento definido en la vista identificado
   * por una referencia de plantilla #referencia
   * El tipo de dato es any, pero podemos imprimirlo para conocer su tipo de dato real.
   * la referencia a elementos es de tipo generico <T>, Por lo que debemos especificar que tipo de elemento HTML es el que se esta referenciando para poder obtener mas ayuda
   * 
   * Las ultimas versiones de Angular se quejan de que es probable de que el elemento en algun momento no se encuentre en la vista
   * por que debemos especificarle que estamos realmente seguros de que ese elemento siempre estara disponible
   * por medio del operador ! (Non Null Assertion Operator)
   * 
   * Con esto tendríamos un enlace de dos vías
   */
  @ViewChild('refCajaBuscador') txtBuscador!:ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar() {
    // console.log(termino);
    // console.log(this.txtBuscador) Conocer el tipo de dato del elemento referenciado
    
    // Con viewChild no hay necesidad de pasar el valor explicitamente en la vista
    const valor = this.txtBuscador.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.txtBuscador.nativeElement.value = "";
  }

}
