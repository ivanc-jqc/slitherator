import {
  updateOverlay,
  addPlayer
} from "./overlay.js"

const PLAYER_POS_OBJ_INDEX = 41;
const MAP_OBJ_INDEX = 39;
const playerPosition = document.getElementsByClassName("nsi")[PLAYER_POS_OBJ_INDEX];
const mapObject = document.getElementsByClassName("nsi")[MAP_OBJ_INDEX];
let players = {};




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
    addPlayer(id, mapObject, newPlayers[id]);

  }
  )

}) 
socket.on("new player", (id) => {
  addPlayer(id, mapObject)
})

socket.on("position", (position) => {
  const {[socket.id]: _, ...temp } = position
  players = temp
});


setInterval(()=>{
  console.log(playerPosition)
    socket.emit('position',  {
  x: playerPosition.x,
  y: playerPosition.y
});
  updateOverlay(players, mapObject);
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