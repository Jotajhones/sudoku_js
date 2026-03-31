class SudokuUI {

    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

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
}



export default SudokuUI;