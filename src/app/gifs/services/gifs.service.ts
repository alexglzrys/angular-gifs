import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string    = 'eKMXey4HdjZ7O0RQ4L6H9VBbsNhOzwFA';
  private apiURL    : string    = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]  = [];
  private _results  : Gif[]     = [];

  // Inyectar el servicio HttpClient que nos ofrece el módulo HttpClientModule
  constructor(private http: HttpClient) { 

    // Los servicios son clases singleton, por tanto, solo se ejecutará una sola vez el constructor, no importando cuantas veces inyecte e invoque el servicio
    // Cualquiera de las dos opciones funciona, la ultima es al estilo TS y Angular Estricto, donde le indicamos ! (diciendo que confie en nosostros si llegara a retorna un valor null)
    this._historial = JSON.parse(localStorage.getItem('historial') || '[]');
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  get results() {
    return [...this._results];
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase()

    // No permitir registros duplicados en nuestro historial
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // Refactorizar el array para considerar solo los 10 primeros registros
      this._historial = this._historial.splice(0, 10);
      // LocalStorage solo puede almacenar valores de tipo string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    // console.log(this._historial);
    // Construir los parametros a enviar junto con la petición. Este objeto solo acepta cadenas de texto, por tanto, es necesario parsear los datos si fuese necesario
    const params = new HttpParams().set('api_key', this.apiKey)
                                   .set('limit', '10')
                                   .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.apiURL}/search`, { params })
        .subscribe((res) => {
          /* Tenemos tres opciones
              1. Declarar de tipo any la respuesta para poder acceder a uno de sus objetos en particular
              2. No declarar el tipo y acceder a la propiedad del objeto como una clave de un array res['data']
              3. Crear una interfaz con base a la data emitida como respuesta
              Ahora se recomienda que el tipado se especifique en el cuerpo de la petición HTTP, que es de tipo generico
          */
          // console.log(res.data);
          this._results = res.data;
          // Almacenar los resultados en localstorage, para prevenir quedarme sin imagenes cuando el usuario recarga el navegador
          localStorage.setItem('results', JSON.stringify(this._results));
        });


  }
}
