import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public _websocketService: WebsocketService
  ) { }

  // Enviar mensaje
  sendMessage(mensaje: string) {
    const payload = {
      de: this._websocketService.getUsuario().nombre,
      cuerpo: mensaje
    };
    this._websocketService.emit('mensaje', payload);
  }

  // Recibir mensajes
  getMessages() {
    return this._websocketService.listen('mensaje-nuevo');
  }

  getMessagesPrivate() {
    return this._websocketService.listen('mensaje-privado');
  }

  getUsuariosActivo() {
    return this._websocketService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    this._websocketService.emit('obtener-usuarios');
  }

}
