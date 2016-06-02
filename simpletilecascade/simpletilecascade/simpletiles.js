var Infrastructure;
(function (Infrastructure) {
    var Cell = (function () {
        function Cell(top, left, index) {
            this.top = top;
            this.left = left;
            this.index = index;
        }
        return Cell;
    })();
    Infrastructure.Cell = Cell;
    var Cells = (function () {
        function Cells(cells) {
            this.cells = cells;
        }
        Cells.prototype.getCell = function (index) {
            var cells = this.cells.filter(function (cell) {
                return cell.index === index;
            });
            if (cells.length < 1)
                return null;
            return cells[0];
        };
        Cells.prototype.getLeft = function (index) {
            return this.px(this.getCell(index).left);
        };
        Cells.prototype.getTop = function (index) {
            return this.px(this.getCell(index).top);
        };
        Cells.prototype.px = function (quantity) {
            return quantity + 'px';
        };
        return Cells;
    })();
    Infrastructure.Cells = Cells;
    var Row = (function () {
        function Row(index) {
            this.index = index;
            this.cells = [];
        }
        Row.prototype.addCell = function (cell) {
            this.cells.push(cell);
        };
        return Row;
    })();
    var SimpleTile = (function () {
        function SimpleTile(options) {
            this.options = options;
            this.cells = [];
            this.rows = [];
        }
        SimpleTile.prototype.getLeft = function () {
            return this.options.left + this.options.margin;
        };
        SimpleTile.prototype.getWidth = function () {
            return this.options.width;
        };
        SimpleTile.prototype.getHeight = function () {
            return this.options.height;
        };
        SimpleTile.prototype.getMargin = function () {
            return this.options.margin;
        };
        SimpleTile.prototype.getFristCellLeft = function () {
            return this.getLeft();
        };
        SimpleTile.prototype.getFirstRowCellTop = function () {
            return this.options.top;
        };
        SimpleTile.prototype.getCellLeft = function (cellIndex) {
            return ((this.getWidth() + this.getMargin()) * (cellIndex - 1)) + this.getLeft();
        };
        SimpleTile.prototype.getCellTop = function (rowIndex) {
            return (this.getHeight() + this.getMargin()) * (rowIndex - 1);
        };
        SimpleTile.prototype.getWorkspaceWidth = function () {
            return this.options.workspaceWidth;
        };
        SimpleTile.prototype.getCellTopForRow = function (rowCount) {
            return (rowCount === 1) ? this.getFirstRowCellTop() : this.getCellTop(rowCount);
        };
        SimpleTile.prototype.tile = function (boxCount) {
            var columnCountPerRow = this.getWorkspaceWidth() / (this.getWidth() + this.getMargin());
            var row = new Row(1);
            var cell;
            columnCountPerRow = parseInt(columnCountPerRow);
            var rowCount = 1;
            var columnCount = 1;
            for (var cellIndex = 1; cellIndex <= boxCount; cellIndex++) {
                if (columnCount == 1) {
                    cell = new Cell(this.getFirstRowCellTop(), this.getFristCellLeft(), cellIndex);
                    row = new Row(rowCount);
                    row.addCell(cell);
                    this.rows.push(row);
                    columnCount++;
                    continue;
                }
                if (columnCount > columnCountPerRow) {
                    rowCount++;
                    row = new Row(rowCount);
                    columnCount = 1;
                    cell = new Cell(this.getCellTopForRow(rowCount), this.getFristCellLeft(), cellIndex);
                    row.addCell(cell);
                    this.rows.push(row);
                    columnCount++;
                    continue;
                }
                cell = new Cell(this.getCellTopForRow(rowCount), this.getCellLeft(columnCount), cellIndex);
                row.addCell(cell);
                columnCount++;
            }
            var computedCells = [];
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].cells.forEach(function (c) {
                    computedCells.push(c);
                });
            }
            return new Cells(computedCells);
        };
        return SimpleTile;
    })();
    Infrastructure.SimpleTile = SimpleTile;
    var Test = (function () {
        function Test() {
        }
        Test.prototype.iCanGetAllCellsAfterTile = function () {
        };
        return Test;
    })();
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=simpletiles.js.map