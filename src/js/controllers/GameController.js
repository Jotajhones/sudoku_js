import SudokuBoard from "../models/SudokuBoard.js";
import SudokuUI from "../views/SudokuUI.js";

class GameController {
    constructor(containerID) {
        this.board = new SudokuBoard();
        this.ui = new SudokuUI(containerID);
    }

    init() {
        const easyPuzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];

        this.board = new SudokuBoard(easyPuzzle);
        this.ui.render(this.board.grid);
        this.setupEvents();
    }

    setupEvents() {
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

            if (this.board.isValid(row, col, value)) {
                input.classList.remove('cell-error');
            } else {
                input.classList.add('cell-error');
            }

            if (this.board.isSolved()) {
                alert('Parabéns! Você resolveu o Sudoku!');
            }

            // FOR DEBUGGING PURPOSES ONLY
            // const cellData = {
            //   Row: row,
            //   Col: col,
            //   Value: value
            // };

            // console.log("Célula atualizada:", cellData);
        });
    }
}

export default GameController;