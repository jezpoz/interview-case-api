import { createServer } from "http";
import { Server } from "socket.io";

import { Game } from "./game";
import { Player } from "./player";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("start_game", () => {
    const player = new Player(socket);
    const game = new Game({
      pokerType: "straight",
      players: [player],
      numberOfSeats: 1,
    });
    game.start();
  });
});

httpServer.listen(3000);
