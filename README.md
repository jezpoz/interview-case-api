# Poker APP

This is the backend or API of the interview case application


From here on, the readme is the same as the [APP](https://github.com/jezpoz/interview-case-app)

# Interview case

Quick intro:  
Create a interface where you are dealt a pokerhand. The cards should be presented with the value first and then the suit.  
This interface should also be able to analyze the value of the hand. (pairs, two pairs, etc.)

## Technical decisions

The interface will be implemented with as SPA with React.js w/ TypeScript.  
Since the task doesn't say any purpose of the app, I assume it's a the start (or initial code) of an online straight poker game where you can play with multiple players. And taking into consideration that this is a first iteration, I will create a simple [socket.io](https://socket.io/) service in Node w/ TypeScript that only serves one game at a time, without number of player requirements.

## Assumtions

In a proffesional environment these would be questions asked to the project owner.

- Assuming it is going to web based, no native applications
- This application will serve as an MVP for a more polished web based poker game.

## Future plans

If this was a hobby-project where I didn't have a deadline, I would like to add more functionality:

- Actual multiplayer
- Possibility to host multiple games
- More poker game modes (texas holdem for instance)
- User management
- User scoring
- CI/CD deploying to [fly.io](https://fly.io/)
- Move app and api code to a common codebase and use monorepo tools for easier development

## Straight Poker

Everyone around the table is dealt 5 cards, with one round of betting, raising and/or re-raising. Though this poker form isn't as complex as draw poker or other forms of poker, as a first iteration this will do.  

### Resources

- [Poker](https://en.wikipedia.org/wiki/Poker)
- [Poker hands](https://en.wikipedia.org/wiki/List_of_poker_hands)