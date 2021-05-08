import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = ""

  constructor(
    public _websocketService: WebsocketService,
    public _router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    // console.log(this.nombre);
    this._websocketService.loginWS(this.nombre).then(
      () => {
        this._router.navigateByUrl('/mensajes')
      }
    );
  }

}
