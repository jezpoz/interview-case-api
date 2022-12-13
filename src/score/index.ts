import { Card } from "../deck";

function subtituteCardValue(value: string | number): number {
  if (["t", "j", "q", "k"].includes(value.toString())) {
    if (value === "t") {
      return 10;
    }
    if (value === "j") {
      return 11;
    }
    if (value === "q") {
      return 12;
    }
    if (value === "k") {
      return 13;
    }
  } else {
    return Number(value);
  }
}

export function checkHandScore(hand: Card[]): string {
  if (hand.length === 5) {
    const handValues = hand.map((card) => card.value);
    const handSuits = hand.map((card) => card.suit);
    const sortedHandValues = handValues
      .sort((a, b) => subtituteCardValue(b) - subtituteCardValue(a))
      .map(subtituteCardValue);
    const sortedHandSuites = handSuits.sort();

    // Flush, straight, royal straight and royal straight flush
    const flush = sortedHandSuites[0] === sortedHandSuites[4];
    const straight = sortedHandValues.every((value, index, array) =>
      index === 0 ? true : array[index - 1] - value === 1
    );
    const royalStraight = straight && sortedHandValues[0] === 13;
    const royalStraightFlush = straight && royalStraight && flush;

    if (royalStraightFlush) {
      return "royal straight flush";
    }
    if (royalStraight) {
      return "royal flush";
    }
    if (straight && flush) {
      return "straight flush";
    }
    if (straight) {
      return "straight";
    }
    if (flush) {
      return "flush";
    }

    const cardMap: { [key: string]: Card[] } = hand.reduce((prev, card) => {
      const cardValue = subtituteCardValue(card.value);
      if (!prev[cardValue]) {
        return {
          ...prev,
          [cardValue]: [card],
        };
      }
      prev[cardValue].push(card);
      return prev;
    }, {});

    const cardsByValues = Object.entries(cardMap);
    if (cardsByValues.length === 5) {
      // No pairs, 3 of a kind, 4 of a kind or house
      // Find biggest highest value - highcard
      let highestCard: Card;
      for (const entry of cardsByValues) {
        if (!highestCard) {
          highestCard = entry[1][0];
          continue;
        }
        if (highestCard.value < subtituteCardValue(entry[1][0].value)) {
          highestCard = entry[1][0];
          continue;
        }
      }
      return `Highcard ${highestCard.value}`;
    }

    if (cardsByValues.length === 2) {
      // House or 4 of a kind
      if (cardsByValues[0][1].length === 4) {
        // four of a kind
        return `Four of a kind`
      }
      if ((cardsByValues[0][1].length === 2 && cardsByValues[1][1].length === 3) || ((cardsByValues[0][1].length === 3 && cardsByValues[1][1].length === 2))) {
        // House
        return `House`;
      }
    }

    const cardByValues = cardsByValues.reduce((prev, entry) => {
      if (prev.number === 0 || prev.number < entry[1].length) {
        return {
          number: entry[1].length,
          card: entry[1][0],
        };
      }
      return prev;
    }, {
      number: 0,
      card: null,
    });

    if (cardByValues.number === 3) {
      return `Three of a kind`;
    }

    return 'Pair';
  }
}
