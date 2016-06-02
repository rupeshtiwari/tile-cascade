/// <reference path="cells.ts" />
/// <reference path="rows.ts" />

module Infrastructure {

    export interface ITileCascadeOptions {
        top: number;
        left: number;
        workspaceWidth: number;
        workspaceHeight: number;
        cascadeMargin: number;
        height?: number;
        width?: number;
        autoResize?: AutoResize;
        maximumColumnsPerRow?: number;
    }

    export enum AutoResize {
        Colspan = 1, Rowspan = 2, Notset = 0
    }

    export class SimpleTile {
        private rows: Row[];
        constructor(public options: ITileCascadeOptions) {
            this.rows = [];
            if (options.autoResize == null)
                this.options.autoResize = AutoResize.Notset;
            this.options.maximumColumnsPerRow = options.maximumColumnsPerRow || 2;
            this.options.height = options.height || 400;
            this.options.width = options.width || 400;
        }

        tile(totalCells: number): Cells {
            var cell: Cell;
            var row: Row = this.getNewRow(1);
            var rowPosition: number = 1;
            var columnPosition: number = 1;
            var cellIndex = 1;
            var incrementRowPosition = () => rowPosition++;
            var incrementColumnPosition = () => columnPosition++;
            var resetColumnPosition = () => columnPosition = 1;

            var cellHeight = () => this.getCellHeight(this.getWorkspaceHeight(), totalCells, columnPosition, rowPosition);
            var cellWidth = () => this.getCellWidth(this.getWorkspaceWidth(), totalCells, columnPosition, rowPosition);
            var addCellToRow = () => {
                cell.assignColumnPosition(columnPosition);
                cell.assignRowPosition(rowPosition);
                row.addCell(cell);
                incrementColumnPosition();
            };

            for (; cellIndex <= totalCells; cellIndex++) {

                if (SimpleTile.getIsFirstRow(cellIndex)) {
                    row = this.getFirstRow();
                    cell = this.getFirstRowFirstCell(cellHeight(), cellWidth());
                    addCellToRow();
                    this.addRow(row);
                    continue;
                }

                if (this.getIsNewRow(columnPosition, rowPosition, totalCells)) {
                    incrementRowPosition();
                    resetColumnPosition();

                    row = this.getNewRow(rowPosition);
                    cell = this.getRowFirstCell(rowPosition, cellIndex, cellHeight(), cellWidth());

                    addCellToRow();
                    this.addRow(row);

                    continue;
                }

                cell = this.getRowCell(rowPosition, columnPosition, cellIndex, cellHeight(), cellWidth());

                addCellToRow();
            }

            return new Cells(this.getAllCells());
        }

        cascade(totalCells: number) {
            var cell: Cell;
            var cells: Cell[] = [];

            var cascadeCellTop = () => (cellIndex == 1)
                ? this.getCellTopForFirstRow() + this.getCascadeMargin()
                : Cells.getPreviousCell(cells, cellIndex).top + this.getCascadeMargin();

            var cascadeCellLeft = () => (cellIndex == 1)
                ? this.getFirstCellLeft() + this.getCascadeMargin()
                : Cells.getPreviousCell(cells, cellIndex).left + this.getCascadeMargin();

            for (var cellIndex = 1; cellIndex <= totalCells; cellIndex++) {
                if (SimpleTile.getIsFirstRow(cellIndex)) {
                    cell = this.getFirstRowFirstCell(null, null);
                    cells.push(cell);
                    continue;
                }
                cell = Cells.createNewCell(cascadeCellTop(), cascadeCellLeft(), cellIndex);
                cells.push(cell);
            }

            return new Cells(cells);
        }

        private getWorkspaceHeight(): number {
            return this.options.workspaceHeight;
        }

        private getWorkspaceWidth(): number {
            return this.options.workspaceWidth;
        }

        private getIsAutoResizeEnabled(): boolean {
            return AutoResize.Notset !== this.options.autoResize;
        }

        private getCascadeMargin() {
            return this.options.cascadeMargin;
        }

        private getInitialLeft() {
            return this.options.left;
        }

        private getInitialTop() {
            return this.options.top;
        }

        private getGivenCellHeight(): number {
            return this.options.height;
        }

        private getAutoResize() {
            return this.options.autoResize;
        }

        private getGivenCellWidth(): number {
            return this.options.width;
        }

        private getCellLeft(columnPosition, cellIndex): number {
            return SimpleTile.roundToFixedTwo((Cells.getPreviousCell(this.getAllCells(), cellIndex).width * (columnPosition - 1)) + this.getInitialLeft());
        }

        private getFirstCellLeft() {
            return this.getInitialLeft();
        }

        private getCellTopForFirstRow() {
            return this.getInitialTop();
        }

        private getCellTopForRow(rowPosition: number, cellIndex: number): number {
            if (rowPosition === 1) {
                return this.getCellTopForFirstRow();
            } else {
                var previousParallelCell = SimpleTile.getParallelPreviousCell(cellIndex, this.getMaximumColumnsPerRow(), this.getAllCells());
                var previousParallelCellY = previousParallelCell.height + previousParallelCell.top;
                return SimpleTile.roundToFixedTwo(previousParallelCellY);
            }
        }

        private getNewRow(index: number) {
            return new Row(index);
        }

        private addRow(row: Row): void {
            this.rows.push(row);
        }

        static getIsFirstRow(cellIndex): boolean {
            return (cellIndex === 1);
        }

        private getFirstRowFirstCell(height: number, width: number): Cell {
            return Cells.createNewCell(this.getCellTopForFirstRow(), this.getFirstCellLeft(), 1, height, width);
        }

        private getRowFirstCell(rowPosition: number, cellIndex: number, height: number, width: number): Cell {
            return Cells.createNewCell(this.getCellTopForRow(rowPosition, cellIndex), this.getFirstCellLeft(), cellIndex, height, width);
        }

        private getRowCell(rowPosition: number, columnPosition: number, cellIndex: number, height: number, width: number): Cell {
            return Cells.createNewCell(this.getCellTopForRow(rowPosition, cellIndex), this.getCellLeft(columnPosition, cellIndex), cellIndex, height, width);
        }

        private getFirstRow(): Row {
            return this.getNewRow(1);
        }

        private getAllCells(): Cell[] {
            var cells: Cell[] = [], rowPosition: number = 0, cellIndex;

            for (; rowPosition < this.rows.length; rowPosition++) {
                for (cellIndex = 0; cellIndex < this.rows[rowPosition].cells.length; cellIndex++) {
                    cells.push(this.rows[rowPosition].cells[cellIndex]);
                }
            }
            return cells;
        }

        private getIsNewRow(columnPosition: number, rowPosition: number, totalCells: number): boolean {
            return columnPosition > this.getMaximumColumnsPerRow();
        }

        static getOddCellCount(totalCells: number, maximumColumnsPerRow: number): number {
            return totalCells % maximumColumnsPerRow;
        }

        private getMaximumColumnsPerRow(): number {
            return this.options.maximumColumnsPerRow;
        }

        static roundToFixedTwo(length: number): number {
            return +length.toFixed(2);
        }

        static getTotalRowCount(totalCells: number, maximumColumnsPerRow: number, oddCellCounts: number): number {
            return parseInt((totalCells / maximumColumnsPerRow).toString()) + (oddCellCounts > 0 ? 1 : 0);
        }

        private getCellHeight(workspaceHeight: number, totalCells: number, columnPosition: number, rowPosition: number): number {
            if (!this.getIsAutoResizeEnabled()) return this.getGivenCellHeight();
            return SimpleTile.calculateCellTileHeight(workspaceHeight, totalCells, this.getMaximumColumnsPerRow(), columnPosition, rowPosition, this.getAutoResize());
        }

        private getCellWidth(workspaceWidth: number, totalCells: number, columnPosition: number, rowPosition: number): number {
            if (!this.getIsAutoResizeEnabled()) return this.getGivenCellWidth();
            return SimpleTile.calculateCellTileWidth(workspaceWidth, totalCells, this.getMaximumColumnsPerRow(), columnPosition, rowPosition, this.getAutoResize());
        }

        static calculateCellTileHeight(workspaceHeight: number, totalCells: number, maximumColumnsPerRow: number, columnPosition: number, rowPosition: number, autoResize: AutoResize) {
            var oddCellCounts = SimpleTile.getOddCellCount(totalCells, maximumColumnsPerRow);

            var totalRows = SimpleTile.getTotalRowCount(totalCells, maximumColumnsPerRow, oddCellCounts);

            if (AutoResize.Rowspan === autoResize) {
                var lastButOneRow = totalRows - 1;

                if (oddCellCounts > 0 && rowPosition <= lastButOneRow && oddCellCounts < columnPosition) {
                    return SimpleTile.roundToFixedTwo(workspaceHeight / lastButOneRow);
                } else {
                    return SimpleTile.roundToFixedTwo(workspaceHeight / totalRows);
                }
            } else if (AutoResize.Colspan === autoResize) {
                return SimpleTile.roundToFixedTwo(workspaceHeight / totalRows);
            }
            return null;
        }

        static calculateCellTileWidth(workspaceWidth: number, totalCells: number, maximumColumnsPerRow: number, columnPosition: number, rowPosition: number, autoResize: AutoResize) {
            var oddCellCounts = SimpleTile.getOddCellCount(totalCells, maximumColumnsPerRow);
            var lastRow = () => rowPosition === SimpleTile.getTotalRowCount(totalCells, maximumColumnsPerRow, oddCellCounts);

            if (AutoResize.Rowspan === autoResize) {
                return SimpleTile.roundToFixedTwo(workspaceWidth / maximumColumnsPerRow);
            } else if (AutoResize.Colspan === autoResize) {
                return (lastRow() && oddCellCounts > 0)
                    ? SimpleTile.roundToFixedTwo(workspaceWidth / oddCellCounts)
                    : SimpleTile.roundToFixedTwo(workspaceWidth / maximumColumnsPerRow);
            }
            return null;
        }

        static getParallelPreviousCell(cellIndex: number, maximumColumnsPerRow: number, cells: Cell[]) {
            return Cells.getCell(cells, cellIndex - maximumColumnsPerRow);
        }
    }
}

