var Infrastructure;
(function (Infrastructure) {
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
    Infrastructure.Row = Row;
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=rows.js.map