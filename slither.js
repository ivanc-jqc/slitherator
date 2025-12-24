
const PLAYER_POS_OBJ_INDEX = 41;
const playerPosition = document.getElementsByClassName("nsi")[PLAYER_POS_OBJ_INDEX];

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

import { io } from "socket.io-client";
const socket = io("http://localhost:3000/", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("position", (msg) => {
  console.log(msg)
});

console.log("all good")
setInterval(()=>{
    socket.emit('position', `${playerPosition.x}, ${playerPosition.y}`);
}, 1000)







