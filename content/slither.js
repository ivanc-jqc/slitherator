import {
  updateOverlay,
  addPlayer,
  removePlayer
} from "./overlay.js"

const PLAYER_POS_OBJ_INDEX = 41;
const playerPosition = document.getElementsByClassName("nsi")[PLAYER_POS_OBJ_INDEX];
let players = {};
let playerElementLookup = {};



import { io } from "socket.io-client";
const socket = io("http://localhost:3000/", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);

});
socket.on("existing players", (newPlayers) => {
  console.log("recieved")
  Object.keys(newPlayers).forEach(id => {
    playerElementLookup[id] = addPlayer(id, newPlayers[id]);
  }
  )

}) 
socket.on("new player", (id) => {
  playerElementLookup[id] = addPlayer(id)
})

socket.on("player disconnect", (id) => {
  removePlayer(playerElementLookup[id])
  delete playerElementLookup[id]
})

//quick way of updating positions
socket.on("position", (position) => {
  const {[socket.id]: _, ...temp } = position
  players = temp
});


setInterval(()=>{
    socket.emit('position',  {
  x: playerPosition.x,
  y: playerPosition.y
});
  updateOverlay(players, playerElementLookup);
  console.log(playerElementLookup)
}, 1000)







// =============================================
//
// Interesting idea... but doesn't work sadly
//
// =============================================
// const handler = {
//     defineProperty(target, property, value, receiver){
//         console.log(value)
//         return Reflect.set(...arguments);
//     }


// };
// const proxy = new Proxy(playerPosition, handler);