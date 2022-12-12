import { CardDeck } from "../deck/index";
import { Seat } from "../seat";
import { Player } from "../player";

export type GameOptions = {
  pokerType: "straight";
  players: Player[];
  numberOfSeats: number;
};

export class Game {
  deck: CardDeck;
  seats: Seat[] = [];
  options: GameOptions;

  constructor(options: GameOptions) {
    this.options = options;

    this.deck = new CardDeck();
    this.deck.initializeDeck();
    this.deck.shuffle();
  }

  // TODO: Implement round, awaiting each seats turn
  // TODO: Implement betting, raising and folding

  start() {
    for (const player of this.options.players) {
      this.seats.push(new Seat(player));
    }
    this.dealCards();
  }

  end() {
    for (const seat of this.seats) {
      seat.player.socket.emit("game_end");
    }
  }

  dealCards(): void {
    for (let i = 0; i < 5; i++) {
      for (const seat of this.seats) {
        const card = this.deck.deal();
        const player = seat.player;
        player.cardDealt(card);
      }
    }
    // Important: When turns have been implemented, remove this line
    this.end(); // Ends game after cards are dealt
  }
}
