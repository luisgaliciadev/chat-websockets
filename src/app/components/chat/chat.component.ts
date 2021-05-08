import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string;
  mensajeSupcription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public _chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajeSupcription = this._chatService.getMessages().subscribe(
      message => {
        console.log('mensaje desde el server: ', message);
        this.mensajes.push(message);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      }
    );
  }

  ngOnDestroy() {
    this.mensajeSupcription.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    this._chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
