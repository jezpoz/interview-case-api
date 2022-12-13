import { Socket } from "socket.io";
import { Card } from '../deck';

import { checkHandScore } from '../score';

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

  checkHand(): void {
    this.socket.emit("hand_score", checkHandScore(this.hand));
  }
}
