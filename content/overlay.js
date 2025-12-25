import browser from "webextension-polyfill";

export const addPlayer = (id, coords = { x: 0, y: 0 }) => {
    if (document.getElementById(id)) return;


    const newPlayer = document.createElement("img");
    newPlayer.id = id;
    newPlayer.className = "nsi";
    newPlayer.src = browser.runtime.getURL("icons/player.png");
    newPlayer.style.cssText = `
    position: absolute;
    left: ${coords.x}px; 
    top: ${coords.y}px; 
    opacity: 1; 
    z-index: 13; 
    transform: translateZ(0px);
    `;
    document.body.append(newPlayer);
    return newPlayer
}

export const updateOverlay = (players, playerElementLookup) => {

    Object.keys(playerElementLookup).forEach(id => {
        playerElementLookup[id].style.cssText = `
    position: absolute;
    left: ${players[id].x}px; 
    top: ${players[id].y}px; 
    opacity: 1; 
    z-index: 13; 
    transform: translateZ(0px);
    `;


    });
}

export const removePlayer = (element) => {
    element.remove()
}