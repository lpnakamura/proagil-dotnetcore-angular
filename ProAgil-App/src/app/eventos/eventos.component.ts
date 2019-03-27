import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  eventosFiltrados: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = true;
  tituloMostrarEsconderImg = 'Esconder Imagem';
  modalRef: BsModalRef;
  
  _filtroLista = '';
  
  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getEventos();
  }
  
  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe((_eventos: Evento[]) => {
      this.eventos = _eventos;
      console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
    this.tituloMostrarEsconderImg = this.mostrarImagem ? 'Esconder Imagem' : 'Mostrar Mensagem';
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }


}
