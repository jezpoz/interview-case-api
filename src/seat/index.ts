import { Player } from '../player';

export class Seat {
  player: Player;
  // index: number; - not important until multiple players in game is implemented

  constructor(player: Player) {
    this.player = player;
  }
}