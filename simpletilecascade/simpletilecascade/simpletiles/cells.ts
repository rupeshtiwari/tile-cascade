module Infrastructure {

    export class Cell {
        constructor(public top: number,
            public left: number,
            public index: number,
            public height: number = null,
            public width: number = null,
            public rowPosition: number = null,
            public columnPosition: number = null) { }

        assignRowPosition(rowPosition): void {
            this.rowPosition = rowPosition;
        }

        assignColumnPosition(columnPosition) {
            this.columnPosition = columnPosition;
        }
    }

    export class Cells {
        constructor(private cells: Cell[]) {

        }

        static getCell(cells, cellIndex): Cell {
            var i = 0;
            for (; i < cells.length; i++) {
                if (cells[i].index === cellIndex) return cells[i];
            }
            return null;
        }

        static getPreviousCell(cells, cellIndex): Cell {
            if (cellIndex === 1) return null;
            return Cells.getCell(cells, cellIndex - 1);
        }

        static getCellAt(cells, cellIndex, rowIndex): Cell {
            var i = 0;
            var cell: Cell;
            for (; i < cells.length; i++) {
                cell = cells[i];
                if (cell.index === cellIndex && cell.rowPosition === rowIndex) return cell;
            }
            return null;
        }

        static getAnyCellOfRow(cells, rowPosition): Cell {
            var i = 0;
            var cell: Cell;
            var filteredCells: Cell[] = [];
            for (; i < cells.length; i++) {
                cell = cells[i];
                if (cell.rowPosition === rowPosition) filteredCells.push(cell);
            }
            return (filteredCells.length > 0) ? filteredCells[0] : null;
        }

        static createNewCell(top: number, left: number, index: number, height?: number, width?: number): Cell {
            return new Cell(top, left, index, height, width);
        }

        getLeft(index): string {
            return this.px(Cells.getCell(this.cells, index).left);
        }

        getTop(index): string {
            return this.px(Cells.getCell(this.cells, index).top);
        }

        getHeight(index): string {
            return this.px(Cells.getCell(this.cells, index).height);
        }

        getWidth(index): string {
            return this.px(Cells.getCell(this.cells, index).width);
        }

        getCell(index): Cell {
            return Cells.getCell(this.cells, index);
        }

        private px(quantity) {
            return quantity + 'px';
        }
    }
} 