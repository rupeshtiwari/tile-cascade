var Infrastructure;
(function (Infrastructure) {
    var Cell = (function () {
        function Cell(top, left, index, height, width, rowPosition, columnPosition) {
            if (height === void 0) { height = null; }
            if (width === void 0) { width = null; }
            if (rowPosition === void 0) { rowPosition = null; }
            if (columnPosition === void 0) { columnPosition = null; }
            this.top = top;
            this.left = left;
            this.index = index;
            this.height = height;
            this.width = width;
            this.rowPosition = rowPosition;
            this.columnPosition = columnPosition;
        }
        Cell.prototype.assignRowPosition = function (rowPosition) {
            this.rowPosition = rowPosition;
        };
        Cell.prototype.assignColumnPosition = function (columnPosition) {
            this.columnPosition = columnPosition;
        };
        return Cell;
    })();
    Infrastructure.Cell = Cell;
    var Cells = (function () {
        function Cells(cells) {
            this.cells = cells;
        }
        Cells.getCell = function (cells, cellIndex) {
            var i = 0;
            for (; i < cells.length; i++) {
                if (cells[i].index === cellIndex)
                    return cells[i];
            }
            return null;
        };
        Cells.getPreviousCell = function (cells, cellIndex) {
            if (cellIndex === 1)
                return null;
            return Cells.getCell(cells, cellIndex - 1);
        };
        Cells.getCellAt = function (cells, cellIndex, rowIndex) {
            var i = 0;
            var cell;
            for (; i < cells.length; i++) {
                cell = cells[i];
                if (cell.index === cellIndex && cell.rowPosition === rowIndex)
                    return cell;
            }
            return null;
        };
        Cells.getAnyCellOfRow = function (cells, rowPosition) {
            var i = 0;
            var cell;
            var filteredCells = [];
            for (; i < cells.length; i++) {
                cell = cells[i];
                if (cell.rowPosition === rowPosition)
                    filteredCells.push(cell);
            }
            return (filteredCells.length > 0) ? filteredCells[0] : null;
        };
        Cells.createNewCell = function (top, left, index, height, width) {
            return new Cell(top, left, index, height, width);
        };
        Cells.prototype.getLeft = function (index) {
            return this.px(Cells.getCell(this.cells, index).left);
        };
        Cells.prototype.getTop = function (index) {
            return this.px(Cells.getCell(this.cells, index).top);
        };
        Cells.prototype.getHeight = function (index) {
            return this.px(Cells.getCell(this.cells, index).height);
        };
        Cells.prototype.getWidth = function (index) {
            return this.px(Cells.getCell(this.cells, index).width);
        };
        Cells.prototype.getCell = function (index) {
            return Cells.getCell(this.cells, index);
        };
        Cells.prototype.px = function (quantity) {
            return quantity + 'px';
        };
        return Cells;
    })();
    Infrastructure.Cells = Cells;
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=cells.js.map