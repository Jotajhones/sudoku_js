/**
 * Gerencia a lógica matemática, o estado do tabuleiro e a geração de puzzles.
 */
class SudokuBoard {
    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.initialGrid = [];
    }

    /**
     * Verifica se um número pode ser colocado em uma célula seguindo as regras do Sudoku.
     */
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

    /**
     * Checa se o tabuleiro está completamente preenchido e válido (Condição de Vitória).
     */
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

    /**
     * Preenche a matriz com um gabarito válido usando algoritmo de Backtracking.
     */
    fillGrid() {
        let row = -1;
        let col = -1;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0) {
                    row = i;
                    col = j;

                    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

                    for (const num of numbers) {
                        if (this.isValid(row, col, num)) {
                            this.grid[row][col] = num;
                            if (this.fillGrid()) {
                                return true;
                            } else {
                                this.grid[row][col] = 0;
                            }
                        }
                    }
                    return false; // Backtrack trigger
                }
            }
            if (row !== -1) break;
        }

        if (row === -1 && col === -1) return true;
        return false;
    }

    /**
     * Gera um novo puzzle removendo células de um gabarito completo e salva o estado inicial.
     */
    generatePuzzle(difficulty = 'easy') { 
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.fillGrid();

        let cellsToRemove;
        switch (difficulty) {
            case 'easy': cellsToRemove = 40; break;
            case 'medium': cellsToRemove = 48; break;
            case 'hard': cellsToRemove = 56; break;
        }

        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.grid[row][col] !== 0) {
                this.grid[row][col] = 0;
                removed++;
            }
        }

        this.initialGrid = this.grid.map(row => row.slice());
    }

    /**
     * Restaura o tabuleiro para o estado original (apaga jogadas do usuário).
     */
    resetBoard() {
        this.grid = this.initialGrid.map(row => row.slice());   
    }
}

export default SudokuBoard;