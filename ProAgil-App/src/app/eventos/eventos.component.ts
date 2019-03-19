import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = new Array;
  eventosFiltrados: any = new Array;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = true;
  tituloMostrarEsconderImg = 'Esconder Imagem';

  private _filtroLista: string;

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.eventos = response;
    }, error => {
      console.log(error);
    });
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
    this.tituloMostrarEsconderImg = this.mostrarImagem ? 'Esconder Imagem' : 'Mostrar Mensagem';
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }


}
