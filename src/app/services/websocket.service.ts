import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketStatus = false;
  usuario: Usuario = null;

  constructor(
    private _socket: Socket,
    private _router: Router
  ) { 
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    // Cliente conectado
    this._socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    // Cliente desconectado
    this._socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  // Emitir
  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo: ', evento);
    this._socket.emit(evento, payload, callback);
  }

  // Escuchar/recibir
  listen(evento: string) {
    return this._socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    return new Promise ((resolve, reject) => {
      this.emit('configurar-usuario', {nombre}, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve(resp);
      });
    });
  }

  getUsuario() {
    return this.usuario;
  }
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if(localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    } 
  }

  loguotWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'no definido'
    };
    this.emit('configurar-usuario', payload, ()=> {});
    this._router.navigateByUrl('');
  }
}
