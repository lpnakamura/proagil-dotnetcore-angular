import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  registerForm: FormGroup;
  
  _filtroLista = '';
  
  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.validation();
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

  salvarAlteracao(){

  }

  validation(){
    this.registerForm = new FormGroup({
      tema: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      local: new FormControl('', Validators.required),
      dataEvento: new FormControl('', Validators.required),
      imagemURL: new FormControl('', Validators.required),
      qtdPessoas: new FormControl('', [Validators.required, Validators.maxLength(120000)]),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }


}
