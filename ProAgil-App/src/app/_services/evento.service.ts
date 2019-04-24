import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

baseURL = 'http://localhost:5000/api/evento';

constructor(private http: HttpClient) { }

getAllEvento(): Observable<Evento[]> {
  return this.http.get<Evento[]>(this.baseURL);
}

getEventoByTema(tema: String): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
}

getEventoById(id: Number): Observable<Evento> {
  return this.http.get<Evento>(`${this.baseURL}/${id}`);
}

postUpload(file: File, name: string) {
  const fileToUplaod = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileToUplaod, name);

  return this.http.post(`${this.baseURL}/upload`, formData);
}

postEvento(evento: Evento) {
  return this.http.post<Evento>(this.baseURL, evento);
}

putEvento(evento: Evento) {
  return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
}

deleteEvento(id: Number) {
  return this.http.delete(`${this.baseURL}/${id}`);
}

}
