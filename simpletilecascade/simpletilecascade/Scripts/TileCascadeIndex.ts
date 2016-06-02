module Infrastructure {

    export class TileCascadeIndex {
        private autoResize: AutoResize;

        constructor() {
            this.onLoad();
        }

        cascade() {
            var options = this.getOptions();

            var simpletile = new Infrastructure.SimpleTile(options);

            var cells = simpletile.cascade(TileCascadeIndex.totalCells());

            this.apply(cells);
        }

        tile() {
            var options = this.getOptions();

            var simpletile = new Infrastructure.SimpleTile(options);

            var cells = simpletile.tile(TileCascadeIndex.totalCells());

            this.apply(cells);
        }

        closeAll() {
            TileCascadeIndex.cleanupCells();
            TileCascadeIndex.resetNumberOfCellsOpen();
        }

        openAll() {
            TileCascadeIndex.cleanupCells();

            var tilesNum = TileCascadeIndex.totalCells();

            for (var i = 1; i <= tilesNum; i++) {
                this.openCell(i);
            }

            this.cascade();
            return false;
        }

        openOneByOne() {

            if (!TileCascadeIndex.isCellOpen()) {
                this.openAll();
            } else {
                TileCascadeIndex.incrementNumberOfCellsOpen();
                var options = this.getOptions();
                var simpletile = new Infrastructure.SimpleTile(options);
                var cellIndex = TileCascadeIndex.totalCells();
                var cells = simpletile.cascade(cellIndex);

                this.openCell(cellIndex);
                this.apply(cells, cellIndex);
            }
        }

        private openCell(index) {
            var dialogContainer: any = $("<div>" + (index) + "</div>");
            dialogContainer.dialog({
                height: TileCascadeIndex.getHeight(index),
                width: TileCascadeIndex.getWidth(index),
                close: () => {
                    TileCascadeIndex.decrementNumberOfCellsOpen();
                },
                dialogClass: 'dialogClass'
            }).dialog('open').show();

            TileCascadeIndex.toggleTileDisable();
        }

        private apply(cells, index?) {
            var zindex;
            zindex = this.getZIndex(index);


            if (index) {
                this.positionCell(cells, index, zindex);
            } else {
                for (var i = 1; i <= $('.ui-dialog').length; i++) {
                    this.positionCell(cells, i, zindex);
                }
            }
        }

        private getZIndex(index: number) {
            if (index === 1 || index == null) return 100;
            else return 100 + index;
        }

        private positionCell(cells: Cells, index: number, zIndex: number) {
            var $dialog = $($('.ui-dialog').get(index - 1));
            $dialog
                .height(TileCascadeIndex.getCellAdjustedHeight(cells, index))
                .width(TileCascadeIndex.getCellAdjustedWidth(cells, index))
                .offset(TileCascadeIndex.getCellOffset(cells, index));
        }

        private onLoad() {
            this.autoResize = AutoResize.Rowspan;

            $(() => {
                TileCascadeIndex.toggleTileDisable();
                $('#openall').click(() => this.openAll()).focus();
                $('#openonebyone').click(() => this.openOneByOne());
                $('#cascade').click(() => this.cascade());
                $('#tile').click(() => this.tile());
                $('#closeall').click(() => this.closeAll());
                $('[name="autoresize"]').click((e) => this.changeAutoResize(e));
            });
        }

        private changeAutoResize(e: any) {
            switch (e.target.value) {
                case 'rowspan':
                    this.autoResize = AutoResize.Rowspan;
                    break;
                case 'colspan':
                    this.autoResize = AutoResize.Colspan;
                    break;
                default:
                    this.autoResize = AutoResize.Notset;
            }
        }

        static incrementNumberOfCellsOpen() { $("#num").val((+($("#num").val())) + 1); }

        static decrementNumberOfCellsOpen() { $("#num").val((+($("#num").val())) - 1); }

        static totalCells() {
            return +($("#num").val());
        }

        static getDelta() {
            return 8.16;
        }

        static getCellAdjustedHeight(cells: Cells, index) {
            return ((cells.getCell(index).height || TileCascadeIndex.getHeight(index)) - TileCascadeIndex.getDelta());
        }

        static getCellAdjustedWidth(cells: Cells, index) {
            return ((cells.getCell(index).width || TileCascadeIndex.getWidth(index)) - TileCascadeIndex.getDelta());
        }

        static getCellOffset(cells: Cells, index) {
            return { "top": cells.getCell(index).top, "left": cells.getCell(index).left };
        }

        static resetNumberOfCellsOpen() {
            $("#num").val(1);
        }

        static getHeight(i?) {
            if (i)
                return 400 + (i * 50);
            else return 400;
        }

        static toggleTileDisable() {
            var canDisable: any = !TileCascadeIndex.isCellOpen();
            $('#tile,#cascade,#closeall').attr("disabled", canDisable);
        }

        static cleanupCells() {
            $('.ui-dialog').remove();
            $('.box').remove();
            TileCascadeIndex.toggleTileDisable();
        }

        static isCellOpen(): any {
            return ($('.ui-dialog').length > 0);
        }

        static getWidth(i?) {
            if (i)
                return 400 + (i * 100);
            else
                return 400;
        }

        private getOptions(): ITileCascadeOptions {
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
        }
    }

    export var tileCascadeIndex = new TileCascadeIndex();
}