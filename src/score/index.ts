import { Card } from '../deck';

function subtituteCardValue(value: string | number): number {
  if (['t', 'j', 'q', 'k'].includes(value.toString())) {
    if (value === 't') {
      return 10;
    }
    if (value === 'j') {
      return 11;
    }
    if (value === 'q') {
      return 12;
    }
    if (value === 'k') {
      return 13;
    }
  } else {
    return Number(value);
  }
}

export function checkHandScore(hand: Card[]): string {
  const handValues = hand.map(card => card.value);
  const handSuits = hand.map(card => card.suit);
  const sortedHandValues = handValues.sort((a, b) => subtituteCardValue(b) - subtituteCardValue(a)).map(subtituteCardValue);
  const sortedHandSuites = handSuits.sort();
  
  // Flush, straight, royal straight and royal straight flush
  const flush = sortedHandSuites[0] === sortedHandSuites[4];
  const straight = sortedHandValues.every((value, index, array) => index === 0 ? true : array[index - 1] - value === 1);
  const royalStraight = straight && sortedHandValues[0] === 13;
  const royalStraightFlush = straight && royalStraight && flush;

  if (royalStraightFlush) {
    return 'royal straight flush';
  }
  if (royalStraight) {
    return 'royal flush';
  }
  if (straight && flush) {
    return 'straight flush';
  }
  if (straight) {
    return 'straight';
  }
  if (flush) {
    return 'flush'
  }

  return 'highcard probably';
}