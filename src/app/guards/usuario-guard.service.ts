import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor(
    public _websocketService: WebsocketService,
    private _router: Router
  ) { }

  canActivate() {
    if (this._websocketService.getUsuario()) {
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }
}
