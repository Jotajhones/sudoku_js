/**
 * Gerencia a renderização do HTML, os destaques visuais e a interface do usuário.
 */
class SudokuUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Desenha o grid 9x9 na tela baseado na matriz do Model.
     */
    render(matrix) {
        this.container.innerHTML = '';

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('input');

                cell.type = 'number'
                cell.min = 1;
                cell.max = 9;
                cell.className = 'cell'
                cell.dataset.row = i;
                cell.dataset.col = j;

                if (matrix[i][j] !== 0) {
                    cell.value = matrix[i][j];
                    cell.readOnly = true;
                }

                this.container.appendChild(cell)
            }
        }
    }

    /**
     * Remove todos os estilos de destaque (linha, coluna, quadrante e números iguais).
     */
    clearHighlights() {
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('cell-highlight');
            cell.classList.remove('cell-same-number');
        });
    }

    /**
     * Destaca a linha, coluna e quadrante 3x3 relativos à célula ativa.
     */
    highlightCrosshairs(row, col) {
        const cells = this.container.querySelectorAll('.cell');

        cells.forEach(cell => {
            const r = parseInt(cell.dataset.row, 10);
            const c = parseInt(cell.dataset.col, 10);

            const isSameBlockRow = Math.floor(r / 3) === Math.floor(row / 3);
            const isSameBlockCol = Math.floor(c / 3) === Math.floor(col / 3);

            if (r === row || c === col || (isSameBlockCol && isSameBlockRow)) {
                cell.classList.add('cell-highlight');
            }
        });
    }

    /**
     * Destaca todas as células que contêm o mesmo número da célula ativa.
     */
    highlightSameNumbers(value) {
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (parseInt(cell.value, 10) === value && parseInt(cell.value, 10) !== 0) {
                cell.classList.add('cell-same-number')
            }
        });
    }

    /**
     * Orquestra a atualização visual quando o usuário foca em uma célula.
     */
    updateHighlights(row, col, value) {
        this.clearHighlights();
        this.highlightCrosshairs(row, col);
        if (value && value !== 0) {
            this.highlightSameNumbers(value);
        }
    }

    /**
     * Pinta uma célula de vermelho para indicar um erro (ignora pistas fixas).
     */
    showError(row, col) {
        const cell = this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell && !cell.readOnly) {
            cell.classList.add('cell-error');
        }
    }

    /**
     * Remove a marcação de erro de uma célula específica.
     */
    removeError(row, col) {
        const cell = this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) cell.classList.remove('cell-error');
    }

    /**
     * Limpa as marcações de erro de todo o tabuleiro.
     */
    clearErrors() {
        const cells = this.container.querySelectorAll('.cell-error');
        cells.forEach(cell => cell.classList.remove('cell-error'));
    }
}

export default SudokuUI;