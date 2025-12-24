import {
  injectOverlay,
  updateOverlay
} from "./overlay.js"

const PLAYER_POS_OBJ_INDEX = 41;
const playerPosition = document.getElementsByClassName("nsi")[PLAYER_POS_OBJ_INDEX];
let players = {};




import { io } from "socket.io-client";
const socket = io("http://localhost:3000/", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("position", (position) => {
  const {[socket.id]: _, ...temp } = position
  players = temp
});

injectOverlay();
setInterval(()=>{
    console.log(players);
    socket.emit('position',  {
  x: playerPosition.x,
  y: playerPosition.y
});
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