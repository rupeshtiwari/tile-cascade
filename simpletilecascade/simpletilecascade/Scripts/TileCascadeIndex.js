var Infrastructure;
(function (Infrastructure) {
    var TileCascadeIndex = (function () {
        function TileCascadeIndex() {
            this.onLoad();
        }
        TileCascadeIndex.prototype.cascade = function () {
            var options = this.getOptions();
            var simpletile = new Infrastructure.SimpleTile(options);
            var cells = simpletile.cascade(TileCascadeIndex.totalCells());
            this.apply(cells);
        };
        TileCascadeIndex.prototype.tile = function () {
            var options = this.getOptions();
            var simpletile = new Infrastructure.SimpleTile(options);
            var cells = simpletile.tile(TileCascadeIndex.totalCells());
            this.apply(cells);
        };
        TileCascadeIndex.prototype.closeAll = function () {
            TileCascadeIndex.cleanupCells();
            TileCascadeIndex.resetNumberOfCellsOpen();
        };
        TileCascadeIndex.prototype.openAll = function () {
            TileCascadeIndex.cleanupCells();
            var tilesNum = TileCascadeIndex.totalCells();
            for (var i = 1; i <= tilesNum; i++) {
                this.openCell(i);
            }
            this.cascade();
            return false;
        };
        TileCascadeIndex.prototype.openOneByOne = function () {
            if (!TileCascadeIndex.isCellOpen()) {
                this.openAll();
            }
            else {
                TileCascadeIndex.incrementNumberOfCellsOpen();
                var options = this.getOptions();
                var simpletile = new Infrastructure.SimpleTile(options);
                var cellIndex = TileCascadeIndex.totalCells();
                var cells = simpletile.cascade(cellIndex);
                this.openCell(cellIndex);
                this.apply(cells, cellIndex);
            }
        };
        TileCascadeIndex.prototype.openCell = function (index) {
            var dialogContainer = $("<div>" + (index) + "</div>");
            dialogContainer.dialog({
                height: TileCascadeIndex.getHeight(index),
                width: TileCascadeIndex.getWidth(index),
                close: function () {
                    TileCascadeIndex.decrementNumberOfCellsOpen();
                },
                dialogClass: 'dialogClass'
            }).dialog('open').show();
            TileCascadeIndex.toggleTileDisable();
        };
        TileCascadeIndex.prototype.apply = function (cells, index) {
            var zindex;
            zindex = this.getZIndex(index);
            if (index) {
                this.positionCell(cells, index, zindex);
            }
            else {
                for (var i = 1; i <= $('.ui-dialog').length; i++) {
                    this.positionCell(cells, i, zindex);
                }
            }
        };
        TileCascadeIndex.prototype.getZIndex = function (index) {
            if (index === 1 || index == null)
                return 100;
            else
                return 100 + index;
        };
        TileCascadeIndex.prototype.positionCell = function (cells, index, zIndex) {
            var $dialog = $($('.ui-dialog').get(index - 1));
            $dialog.height(TileCascadeIndex.getCellAdjustedHeight(cells, index)).width(TileCascadeIndex.getCellAdjustedWidth(cells, index)).offset(TileCascadeIndex.getCellOffset(cells, index));
        };
        TileCascadeIndex.prototype.onLoad = function () {
            var _this = this;
            this.autoResize = 2 /* Rowspan */;
            $(function () {
                TileCascadeIndex.toggleTileDisable();
                $('#openall').click(function () { return _this.openAll(); }).focus();
                $('#openonebyone').click(function () { return _this.openOneByOne(); });
                $('#cascade').click(function () { return _this.cascade(); });
                $('#tile').click(function () { return _this.tile(); });
                $('#closeall').click(function () { return _this.closeAll(); });
                $('[name="autoresize"]').click(function (e) { return _this.changeAutoResize(e); });
            });
        };
        TileCascadeIndex.prototype.changeAutoResize = function (e) {
            switch (e.target.value) {
                case 'rowspan':
                    this.autoResize = 2 /* Rowspan */;
                    break;
                case 'colspan':
                    this.autoResize = 1 /* Colspan */;
                    break;
                default:
                    this.autoResize = 0 /* Notset */;
            }
        };
        TileCascadeIndex.incrementNumberOfCellsOpen = function () {
            $("#num").val((+($("#num").val())) + 1);
        };
        TileCascadeIndex.decrementNumberOfCellsOpen = function () {
            $("#num").val((+($("#num").val())) - 1);
        };
        TileCascadeIndex.totalCells = function () {
            return +($("#num").val());
        };
        TileCascadeIndex.getDelta = function () {
            return 8.16;
        };
        TileCascadeIndex.getCellAdjustedHeight = function (cells, index) {
            return ((cells.getCell(index).height || TileCascadeIndex.getHeight(index)) - TileCascadeIndex.getDelta());
        };
        TileCascadeIndex.getCellAdjustedWidth = function (cells, index) {
            return ((cells.getCell(index).width || TileCascadeIndex.getWidth(index)) - TileCascadeIndex.getDelta());
        };
        TileCascadeIndex.getCellOffset = function (cells, index) {
            return { "top": cells.getCell(index).top, "left": cells.getCell(index).left };
        };
        TileCascadeIndex.resetNumberOfCellsOpen = function () {
            $("#num").val(1);
        };
        TileCascadeIndex.getHeight = function (i) {
            if (i)
                return 400 + (i * 50);
            else
                return 400;
        };
        TileCascadeIndex.toggleTileDisable = function () {
            var canDisable = !TileCascadeIndex.isCellOpen();
            $('#tile,#cascade,#closeall').attr("disabled", canDisable);
        };
        TileCascadeIndex.cleanupCells = function () {
            $('.ui-dialog').remove();
            $('.box').remove();
            TileCascadeIndex.toggleTileDisable();
        };
        TileCascadeIndex.isCellOpen = function () {
            return ($('.ui-dialog').length > 0);
        };
        TileCascadeIndex.getWidth = function (i) {
            if (i)
                return 400 + (i * 100);
            else
                return 400;
        };
        TileCascadeIndex.prototype.getOptions = function () {
            var delta = 8.16;
            return {
                top: +$("#top").val(),
                left: +$("#left").val(),
                height: TileCascadeIndex.getHeight() + delta,
                width: TileCascadeIndex.getWidth() + delta,
                workspaceWidth: +$("#workspacewidth").val(),
                workspaceHeight: +$("#workspaceheight").val(),
                cascadeMargin: +$("#cascademargin").val(),
                autoResize: this.autoResize,
                maximumColumnsPerRow: +$('#maxcol').val()
            };
        };
        return TileCascadeIndex;
    })();
    Infrastructure.TileCascadeIndex = TileCascadeIndex;
    Infrastructure.tileCascadeIndex = new TileCascadeIndex();
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=TileCascadeIndex.js.map