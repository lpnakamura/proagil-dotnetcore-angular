import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [EventoService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {  }
