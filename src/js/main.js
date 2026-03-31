import GameController from "./controllers/GameController.js"

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController('board-container');
    game.init();
})