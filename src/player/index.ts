import { Socket } from "socket.io";
import { Card } from '../deck';

export class Player {
  hand: Card[] = [];
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  cardDealt(card: Card): void {
    this.hand.push(card);
    this.socket.emit("deal_card", card);
  }
}
