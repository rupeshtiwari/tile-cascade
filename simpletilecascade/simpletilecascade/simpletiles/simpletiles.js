/// <reference path="cells.ts" />
/// <reference path="rows.ts" />
var Infrastructure;
(function (Infrastructure) {
    (function (AutoResize) {
        AutoResize[AutoResize["Colspan"] = 1] = "Colspan";
        AutoResize[AutoResize["Rowspan"] = 2] = "Rowspan";
        AutoResize[AutoResize["Notset"] = 0] = "Notset";
    })(Infrastructure.AutoResize || (Infrastructure.AutoResize = {}));
    var AutoResize = Infrastructure.AutoResize;
    var SimpleTile = (function () {
        function SimpleTile(options) {
            this.options = options;
            this.rows = [];
            if (options.autoResize == null)
                this.options.autoResize = 0 /* Notset */;
            this.options.maximumColumnsPerRow = options.maximumColumnsPerRow || 2;
            this.options.height = options.height || 400;
            this.options.width = options.width || 400;
        }
        SimpleTile.prototype.tile = function (totalCells) {
            var _this = this;
            var cell;
            var row = this.getNewRow(1);
            var rowPosition = 1;
            var columnPosition = 1;
            var cellIndex = 1;
            var incrementRowPosition = function () { return rowPosition++; };
            var incrementColumnPosition = function () { return columnPosition++; };
            var resetColumnPosition = function () { return columnPosition = 1; };
            var cellHeight = function () { return _this.getCellHeight(_this.getWorkspaceHeight(), totalCells, columnPosition, rowPosition); };
            var cellWidth = function () { return _this.getCellWidth(_this.getWorkspaceWidth(), totalCells, columnPosition, rowPosition); };
            var addCellToRow = function () {
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
            return new Infrastructure.Cells(this.getAllCells());
        };
        SimpleTile.prototype.cascade = function (totalCells) {
            var _this = this;
            var cell;
            var cells = [];
            var cascadeCellTop = function () { return (cellIndex == 1) ? _this.getCellTopForFirstRow() + _this.getCascadeMargin() : Infrastructure.Cells.getPreviousCell(cells, cellIndex).top + _this.getCascadeMargin(); };
            var cascadeCellLeft = function () { return (cellIndex == 1) ? _this.getFirstCellLeft() + _this.getCascadeMargin() : Infrastructure.Cells.getPreviousCell(cells, cellIndex).left + _this.getCascadeMargin(); };
            for (var cellIndex = 1; cellIndex <= totalCells; cellIndex++) {
                if (SimpleTile.getIsFirstRow(cellIndex)) {
                    cell = this.getFirstRowFirstCell(null, null);
                    cells.push(cell);
                    continue;
                }
                cell = Infrastructure.Cells.createNewCell(cascadeCellTop(), cascadeCellLeft(), cellIndex);
                cells.push(cell);
            }
            return new Infrastructure.Cells(cells);
        };
        SimpleTile.prototype.getWorkspaceHeight = function () {
            return this.options.workspaceHeight;
        };
        SimpleTile.prototype.getWorkspaceWidth = function () {
            return this.options.workspaceWidth;
        };
        SimpleTile.prototype.getIsAutoResizeEnabled = function () {
            return 0 /* Notset */ !== this.options.autoResize;
        };
        SimpleTile.prototype.getCascadeMargin = function () {
            return this.options.cascadeMargin;
        };
        SimpleTile.prototype.getInitialLeft = function () {
            return this.options.left;
        };
        SimpleTile.prototype.getInitialTop = function () {
            return this.options.top;
        };
        SimpleTile.prototype.getGivenCellHeight = function () {
            return this.options.height;
        };
        SimpleTile.prototype.getAutoResize = function () {
            return this.options.autoResize;
        };
        SimpleTile.prototype.getGivenCellWidth = function () {
            return this.options.width;
        };
        SimpleTile.prototype.getCellLeft = function (columnPosition, cellIndex) {
            return SimpleTile.roundToFixedTwo((Infrastructure.Cells.getPreviousCell(this.getAllCells(), cellIndex).width * (columnPosition - 1)) + this.getInitialLeft());
        };
        SimpleTile.prototype.getFirstCellLeft = function () {
            return this.getInitialLeft();
        };
        SimpleTile.prototype.getCellTopForFirstRow = function () {
            return this.getInitialTop();
        };
        SimpleTile.prototype.getCellTopForRow = function (rowPosition, cellIndex) {
            if (rowPosition === 1) {
                return this.getCellTopForFirstRow();
            }
            else {
                var previousParallelCell = SimpleTile.getParallelPreviousCell(cellIndex, this.getMaximumColumnsPerRow(), this.getAllCells());
                var previousParallelCellY = previousParallelCell.height + previousParallelCell.top;
                return SimpleTile.roundToFixedTwo(previousParallelCellY);
            }
        };
        SimpleTile.prototype.getNewRow = function (index) {
            return new Infrastructure.Row(index);
        };
        SimpleTile.prototype.addRow = function (row) {
            this.rows.push(row);
        };
        SimpleTile.getIsFirstRow = function (cellIndex) {
            return (cellIndex === 1);
        };
        SimpleTile.prototype.getFirstRowFirstCell = function (height, width) {
            return Infrastructure.Cells.createNewCell(this.getCellTopForFirstRow(), this.getFirstCellLeft(), 1, height, width);
        };
        SimpleTile.prototype.getRowFirstCell = function (rowPosition, cellIndex, height, width) {
            return Infrastructure.Cells.createNewCell(this.getCellTopForRow(rowPosition, cellIndex), this.getFirstCellLeft(), cellIndex, height, width);
        };
        SimpleTile.prototype.getRowCell = function (rowPosition, columnPosition, cellIndex, height, width) {
            return Infrastructure.Cells.createNewCell(this.getCellTopForRow(rowPosition, cellIndex), this.getCellLeft(columnPosition, cellIndex), cellIndex, height, width);
        };
        SimpleTile.prototype.getFirstRow = function () {
            return this.getNewRow(1);
        };
        SimpleTile.prototype.getAllCells = function () {
            var cells = [], rowPosition = 0, cellIndex;
            for (; rowPosition < this.rows.length; rowPosition++) {
                for (cellIndex = 0; cellIndex < this.rows[rowPosition].cells.length; cellIndex++) {
                    cells.push(this.rows[rowPosition].cells[cellIndex]);
                }
            }
            return cells;
        };
        SimpleTile.prototype.getIsNewRow = function (columnPosition, rowPosition, totalCells) {
            return columnPosition > this.getMaximumColumnsPerRow();
        };
        SimpleTile.getOddCellCount = function (totalCells, maximumColumnsPerRow) {
            return totalCells % maximumColumnsPerRow;
        };
        SimpleTile.prototype.getMaximumColumnsPerRow = function () {
            return this.options.maximumColumnsPerRow;
        };
        SimpleTile.roundToFixedTwo = function (length) {
            return +length.toFixed(2);
        };
        SimpleTile.getTotalRowCount = function (totalCells, maximumColumnsPerRow, oddCellCounts) {
            return parseInt((totalCells / maximumColumnsPerRow).toString()) + (oddCellCounts > 0 ? 1 : 0);
        };
        SimpleTile.prototype.getCellHeight = function (workspaceHeight, totalCells, columnPosition, rowPosition) {
            if (!this.getIsAutoResizeEnabled())
                return this.getGivenCellHeight();
            return SimpleTile.calculateCellTileHeight(workspaceHeight, totalCells, this.getMaximumColumnsPerRow(), columnPosition, rowPosition, this.getAutoResize());
        };
        SimpleTile.prototype.getCellWidth = function (workspaceWidth, totalCells, columnPosition, rowPosition) {
            if (!this.getIsAutoResizeEnabled())
                return this.getGivenCellWidth();
            return SimpleTile.calculateCellTileWidth(workspaceWidth, totalCells, this.getMaximumColumnsPerRow(), columnPosition, rowPosition, this.getAutoResize());
        };
        SimpleTile.calculateCellTileHeight = function (workspaceHeight, totalCells, maximumColumnsPerRow, columnPosition, rowPosition, autoResize) {
            var oddCellCounts = SimpleTile.getOddCellCount(totalCells, maximumColumnsPerRow);
            var totalRows = SimpleTile.getTotalRowCount(totalCells, maximumColumnsPerRow, oddCellCounts);
            if (2 /* Rowspan */ === autoResize) {
                var lastButOneRow = totalRows - 1;
                if (oddCellCounts > 0 && rowPosition <= lastButOneRow && oddCellCounts < columnPosition) {
                    return SimpleTile.roundToFixedTwo(workspaceHeight / lastButOneRow);
                }
                else {
                    return SimpleTile.roundToFixedTwo(workspaceHeight / totalRows);
                }
            }
            else if (1 /* Colspan */ === autoResize) {
                return SimpleTile.roundToFixedTwo(workspaceHeight / totalRows);
            }
            return null;
        };
        SimpleTile.calculateCellTileWidth = function (workspaceWidth, totalCells, maximumColumnsPerRow, columnPosition, rowPosition, autoResize) {
            var oddCellCounts = SimpleTile.getOddCellCount(totalCells, maximumColumnsPerRow);
            var lastRow = function () { return rowPosition === SimpleTile.getTotalRowCount(totalCells, maximumColumnsPerRow, oddCellCounts); };
            if (2 /* Rowspan */ === autoResize) {
                return SimpleTile.roundToFixedTwo(workspaceWidth / maximumColumnsPerRow);
            }
            else if (1 /* Colspan */ === autoResize) {
                return (lastRow() && oddCellCounts > 0) ? SimpleTile.roundToFixedTwo(workspaceWidth / oddCellCounts) : SimpleTile.roundToFixedTwo(workspaceWidth / maximumColumnsPerRow);
            }
            return null;
        };
        SimpleTile.getParallelPreviousCell = function (cellIndex, maximumColumnsPerRow, cells) {
            return Infrastructure.Cells.getCell(cells, cellIndex - maximumColumnsPerRow);
        };
        return SimpleTile;
    })();
    Infrastructure.SimpleTile = SimpleTile;
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=simpletiles.js.map