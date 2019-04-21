import { Evento } from './../_models/Evento';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale, BsDatepickerConfig } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  titulo = 'Eventos';
  evento: Evento;
  eventos: Evento[];
  eventosFiltrados: Evento[] = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = true;
  tituloMostrarEsconderImg = 'Esconder Imagem';
  modalRef: BsModalRef;
  registerForm: FormGroup;
  isEdited = false;
  bodyDeletarEvento: string;

  _filtroLista = '';

  constructor(private eventoService: EventoService, private modalService: BsModalService,
    private fb: FormBuilder, private locateService: BsLocaleService, private datePickerConfig: BsDatepickerConfig,
    private toastr: ToastrService) {
      this.locateService.use('pt-br');
      this.datePickerConfig.dateInputFormat = 'DD/MM/YYYY hh:mm a';
    }

    ngOnInit() {
      this.getEventos();
      this.validation();
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
        this.eventosFiltrados = this.eventos = _eventos;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar Eventos: ${error.message}`);
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

    novoEvento(template: any) {
      this.isEdited = false;
      this.registerForm.reset();
      template.show();
    }

    editarEvento(evento: Evento, template: any) {
      this.isEdited = true;
      this.evento = evento;
      this.registerForm.patchValue(this.evento);
      template.show();
    }

    excluirEvento(evento: Evento, template: any) {
      this.evento = evento;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
      template.show();
    }

    confirmeDelete(template: any) {
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Excluido com sucesso');
        }, error => {
          console.log(error);
          this.toastr.error('Erro ao Excluir');
        }
        );
      }

      salvarAlteracao(template: any) {
        if (this.registerForm.valid) {
          if (!this.isEdited) {
            this.evento = Object.assign({}, this.registerForm.value);
            this.eventoService.postEvento(this.evento).subscribe(
              () => {
                template.hide();
                this.getEventos();
                this.toastr.success('Adicionado com sucesso');
              }, error => {
                console.log(error);
                this.toastr.error('Falha ao adicionar');
              });
            } else {
              this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
              this.eventoService.putEvento(this.evento).subscribe(
                () => {
                  template.hide();
                  this.getEventos();
                  this.toastr.success('Editado com sucesso');
                }, error => {
                  console.log(error);
                  this.toastr.error('Falha ao editar');
                });
              }
            }
      }

      validation() {
        this.registerForm = this.fb.group({
          tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          local: ['', Validators.required],
          dataEvento: ['', Validators.required],
          imagemUrl: ['', Validators.required],
          qtdPessoa: ['', [Validators.required, Validators.max(120000)]],
          telefone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        });
      }
}
