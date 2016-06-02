var Infrastructure;
(function (Infrastructure) {
    var TileCascadeIndex = (function () {
        function TileCascadeIndex() {
            var _this = this;
            $(function () {
                _this.toggleTileDisable();
                $("#open").focus();
            });
        }
        TileCascadeIndex.prototype.toggleTileDisable = function () {
            $('#tile,#cascade,#closeall').attr("disabled", this.isCellOpen());
        };
        TileCascadeIndex.prototype.closeAll = function () {
            this.cleanupCells();
            this.resetNumberOfCellsOpen();
        };
        TileCascadeIndex.prototype.cleanupCells = function () {
            $('.ui-dialog').remove();
            $('.box').remove();
            this.toggleTileDisable();
        };
        TileCascadeIndex.prototype.isCellOpen = function () {
            return ($('.ui-dialog').length < 1);
        };
        TileCascadeIndex.prototype.tilesNumbers = function () {
            return +($("#num").val());
        };
        TileCascadeIndex.prototype.openAll = function () {
            this.cleanupCells();
            var tilesNum = this.tilesNumbers();
            for (var i = 1; i <= tilesNum; i++) {
                this.openCell(i);
            }
            this.cascade();
            return false;
        };
        TileCascadeIndex.prototype.openCell = function (index) {
            var that = this;
            var dialogContainer = $("<div>" + (index) + "</div>");
            dialogContainer.dialog({
                height: that.getHeight(index),
                width: that.getWidth(index),
                close: function () {
                    that.decrementNumberOfCellsOpen();
                }
            }).dialog('open').show();
            this.toggleTileDisable();
        };
        TileCascadeIndex.prototype.openOneByOne = function () {
            var options = this.getOptions();
            var simpletile = new Infrastructure.SimpleTile(options);
            var cellIndex = this.tilesNumbers();
            var cells = simpletile.cascade(cellIndex);
            this.openCell(cellIndex);
            this.apply(cells, cellIndex);
            this.incrementNumberOfCellsOpen();
        };
        TileCascadeIndex.prototype.incrementNumberOfCellsOpen = function () {
            $("#num").val((+($("#num").val())) + 1);
        };
        TileCascadeIndex.prototype.decrementNumberOfCellsOpen = function () {
            $("#num").val((+($("#num").val())) - 1);
        };
        TileCascadeIndex.prototype.resetNumberOfCellsOpen = function () {
            $("#num").val(1);
        };
        TileCascadeIndex.prototype.getHeight = function (i) {
            if (i)
                return 400 + (i * 50);
            else
                return 400;
        };
        TileCascadeIndex.prototype.getWidth = function (i) {
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
                height: this.getHeight() + delta,
                width: this.getWidth() + delta,
                workspaceWidth: +$("#workspacewidth").val(),
                workspaceHeight: +$("#workspaceheight").val(),
                cascadeMargin: +$("#cascademargin").val()
            };
        };
        TileCascadeIndex.prototype.cascade = function () {
            var options = this.getOptions();
            var simpletile = new Infrastructure.SimpleTile(options);
            var cells = simpletile.cascade(this.tilesNumbers());
            this.apply(cells);
        };
        TileCascadeIndex.prototype.tile = function () {
            var options = this.getOptions();
            var simpletile = new Infrastructure.SimpleTile(options);
            var cells = simpletile.tile(this.tilesNumbers());
            this.apply(cells);
        };
        TileCascadeIndex.prototype.apply = function (cells, index) {
            if (index) {
                this.positionCell(cells, index);
            }
            for (var i = 0; i < $('.ui-dialog').length; i++) {
                this.positionCell(cells, i);
            }
        };
        TileCascadeIndex.prototype.positionCell = function (cells, index) {
            var dialog;
            var delta = 8.16;
            dialog = $('.ui-dialog').get(index);
            $(dialog).height(((cells.getCell(index + 1).height || this.getHeight(index)) - delta)).width(((cells.getCell(index + 1).width || this.getWidth(index)) - delta)).offset({ "top": cells.getCell(index + 1).top, "left": cells.getCell(index + 1).left });
        };
        return TileCascadeIndex;
    })();
    Infrastructure.TileCascadeIndex = TileCascadeIndex;
    Infrastructure.tileCascadeIndex = new TileCascadeIndex();
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=index.js.map