import {
	updateOverlay,
	addPlayer,
	removePlayer
} from "./overlay.js"
import { io } from "socket.io-client";
const PLAYER_POS_OBJ_INDEX = 41;
const playerPosition = document.getElementsByClassName("nsi")[PLAYER_POS_OBJ_INDEX];
//ts so horrible!!!! change ts!!!!
let players = {};
let playerElementLookup = {};
let intervalId = null;
let socket = null


browser.runtime.onMessage.addListener((msg, sender) => {
	console.log("message received:", msg);

	if (msg.type === "TUNNEL") {
		console.log("PING value:", msg.value);
		if (socket) {
			socket.disconnect();
			socket = null;
		}
		socket = io(msg.value, {
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
			const { [socket.id]: _, ...temp } = position
			players = temp
		});
		if (intervalId !== null) {
			clearInterval(intervalId);
		}
		intervalId = setInterval(() => {
			socket.emit('position', {
				x: playerPosition.x,
				y: playerPosition.y
			});
			console.log(players)
			console.log(playerElementLookup)
			updateOverlay(players, playerElementLookup);
		}, 1000)

	}
});










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