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
    var Row = (function () {
        function Row() {
        }
        return Row;
    })();
    var MarbleTile = (function () {
        function MarbleTile(options) {
            this.options = options;
            this.cells = [];
        }
        MarbleTile.prototype.top = function () {
            return this.options.top;
        };
        MarbleTile.prototype.left = function () {
            return this.options.left;
        };
        MarbleTile.prototype.width = function () {
            return this.options.cellWidth;
        };
        MarbleTile.prototype.margin = function () {
            return this.options.margin;
        };
        MarbleTile.prototype.getFristCellLeft = function () {
            return this.left();
        };
        MarbleTile.prototype.getCellLeft = function (cellIndex) {
            return (this.width() + this.left() + this.margin()) * cellIndex;
        };
        MarbleTile.prototype.getCell = function (index) {
            var cells = this.cells.filter(function (cell) {
                return cell.index === index;
            });
            if (cells.length < 1)
                return null;
            return cells[0];
        };
        MarbleTile.prototype.getLeft = function (index) {
            return this.px(this.getCell(index).left);
        };
        MarbleTile.prototype.getTop = function (index) {
            return this.px(this.getCell(index).top);
        };
        MarbleTile.prototype.px = function (quantity) {
            return quantity + 'px';
        };
        MarbleTile.prototype.tile = function () {
            return [
                {
                    top: this.top(),
                    left: this.getFristCellLeft(),
                    index: 0
                },
                {
                    top: this.top(),
                    left: this.getCellLeft(1),
                    index: 1
                }
            ];
        };
        return MarbleTile;
    })();
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=marbletiles.js.map