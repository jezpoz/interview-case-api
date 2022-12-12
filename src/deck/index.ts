export type Card = {
  suit: string;
  value: number | string;
}

export class CardDeck {
  deck: Card[];

  constructor() {
    this.deck = [];
  }

  initializeDeck(): void {
    const suits: string[] = ['hearts', 'diamonds', 'spades', 'club'];
    const values: (string|number)[] = [2, 3, 4, 5, 6, 7, 8, 9, 't', 'j', 'q', 'k'];

    for (const suit of suits) {
      for (const value of values) {
        this.deck.push({
          suit,
          value,
        });
      }
    }
  }

  shuffle(): void {
    for (let i = 0; i < this.deck.length; i++) {
      const randomCardIndex: number = Math.floor(Math.random() * this.deck.length);
      const tempCard: Card = this.deck[i];
      this.deck[i] = this.deck[randomCardIndex];
      this.deck[randomCardIndex] = tempCard;
    }
  }

  deal(): Card {
    if (this.deck.length > 0) {
      const card = this.deck.shift();
      if (card) {
        return card;
      }
    }
    throw new Error('Error while dealing card. Either all cards are dealt');
  }
}