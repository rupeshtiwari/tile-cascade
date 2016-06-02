module Infrastructure {
    export class Row {
        cells: Cell[];

        constructor(public index: number) {
            this.cells = [];
        }

        addCell(cell: Cell) {
            this.cells.push(cell);
        }
    }
}