import SudokuBoard from "../models/SudokuBoard.js";
import SudokuUI from "../views/SudokuUI.js";
import Timer from "../utils/Timer.js";

/**
 * Orquestra a comunicação entre a View e o Model e gerencia o fluxo de eventos.
 */
class GameController {
    constructor(containerID) {
        this.board = new SudokuBoard();
        this.ui = new SudokuUI(containerID);
        this.isPuristMode = false;
        this.timer = new Timer('game-timer');
    }

    /**
     * Inicializa a partida, gera o primeiro puzzle e vincula os eventos DOM.
     */
    init() {
        this.startNewGame();
        this.setupEvents();
    }

    /**
     * Centraliza todos os escutadores de eventos de input, cliques e controles.
     */
    setupEvents() {
        // Evento de Digitação e Validação
        this.ui.container.addEventListener('input', (event) => {
            const input = event.target;
            const row = parseInt(input.getAttribute('data-row'), 10);
            const col = parseInt(input.getAttribute('data-col'), 10);
            const value = input.value === '' ? 0 : parseInt(input.value, 10);

            if (input.value === '0' || value < 0 || value > 9) {
                const previousValue = this.board.grid[row][col];
                input.value = previousValue === 0 ? '' : previousValue;
                return;
            }

            this.board.grid[row][col] = value;
            const isValid = this.board.isValid(row, col, value);

            if (!isValid && value !== 0) {
                if (!this.isPuristMode) this.ui.showError(row, col);
            } else {
                this.ui.removeError(row, col);
            }

            if (this.board.isSolved()) {
                alert('Parabéns! Você resolveu o Sudoku!');
            }
        });

        // Evento de Foco para Destaques (Crosshatching)
        this.ui.container.addEventListener('focusin', (event) => {
            if (event.target.classList.contains('cell')) {
                const row = parseInt(event.target.dataset.row, 10);
                const col = parseInt(event.target.dataset.col, 10);
                const value = event.target.value === '' ? 0 : parseInt(event.target.value, 10);

                this.ui.updateHighlights(row, col, value);
            }
        });

        // Toggle do Modo Purista
        const puristToggle = document.getElementById('purist-toggle');
        if (puristToggle) {
            puristToggle.addEventListener('change', (event) => {
                this.togglePuristMode(event.target.checked);
            });
        }

        // Botão de Novo Jogo
        const newGameButton = document.getElementById('btn-new-game');
        if (newGameButton) {
            newGameButton.addEventListener('click', () => {
                this.startNewGame();
            });
        }

        // Botão de Reiniciar Partida
        const resetButton = document.getElementById('btn-restart');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetGame();
            });
        }
    }

    /**
     * Alterna o estado de assistência visual e força revalidação se necessário.
     */
    togglePuristMode(isActive) {
        this.isPuristMode = isActive;
        if (this.isPuristMode) {
            this.ui.clearErrors();
        } else {
            this.revalidateBoard();
        }
    }

    /**
     * Varre todo o tabuleiro procurando erros ocultos para mostrá-los na tela.
     */
    revalidateBoard() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = this.board.grid[row][col];
                if (value !== 0) {
                    const isValid = this.board.isValid(row, col, value);
                    if (!isValid) {
                        this.ui.showError(row, col);
                    } else {
                        this.ui.removeError(row, col);
                    }
                }
            }
        }
    }

    /**
     * Gera um tabuleiro inédito e renderiza do zero.
     */
    startNewGame() {
        this.board.generatePuzzle();
        this.ui.render(this.board.grid);
        this.togglePuristMode(this.isPuristMode);
        this.timer.reset();
        this.timer.start();
    }

    /**
     * Apaga as jogadas do usuário e volta o tabuleiro ao seu estado inicial.
     */
    resetGame() {
        this.board.resetBoard();
        this.ui.render(this.board.grid);
        this.togglePuristMode(this.isPuristMode);
    }
}

export default GameController;