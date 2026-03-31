class SudokuBoard {

    constructor(initialGrid = null) {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));

        if (initialGrid) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    this.grid[i][j] = initialGrid[i][j] || 0;
                }
            }
        }
    }

    isValid(row, col, value) {

        if (value === 0) return true;

        if (this.grid[row].some((val, index) => val === value && index !== col)) {
            return false;
        }

        if (this.grid.some((rowArray, rowIndex) => rowArray[col] === value && rowIndex !== row)) {
            return false;
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                const currentRow = startRow + i;
                const currentCol = startCol + j;

                if (currentRow === row && currentCol === col) continue;

                if (this.grid[currentRow][currentCol] === value) {
                    return false;
                }
            }
        }

        return true;
    }

    isSolved() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0 || !this.isValid(i, j, this.grid[i][j])) {
                    return false;
                }
            }
        }
        return true;
    }
}


export default SudokuBoard;