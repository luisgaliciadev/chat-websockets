import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    public _websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  salir() {
    this._websocketService.loguotWS();
  }

}
