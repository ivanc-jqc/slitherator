export const addPlayer = (id, mapObject, coords = {x:0, y:0}) => {
    if (document.getElementById(id)) return;


    const newPlayer = document.createElement("img");
    newPlayer.id = id;
    newPlayer.className = "nsi";
    newPlayer.src = "icons/player.png" 
    newPlayer.style.cssText = `
    position: absolute;
    left: ${coords.x}px; 
    top: ${coords.y}px; 
    opacity: 1; 
    z-index: 13; 
    transform: translateZ(0px);
    `;
    console.log(coords.x)
    document.body.append(newPlayer);

}

export const updateOverlay = (players) => {
    let x = 0;
    let y = 0;
    Object.keys(players).forEach(id => {

        x = players[id].x;
        y = players[id].y;


    });
}
