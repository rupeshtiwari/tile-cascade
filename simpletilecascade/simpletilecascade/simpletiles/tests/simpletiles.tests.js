/// <reference path="../../simpletiles/cells.ts" />
/// <reference path="../../simpletiles/rows.ts" />
/// <reference path="../../simpletiles/simpletiles.ts" />
/// <reference path="../../scripts/typings/jasmine.d.ts" />
var Infrastructure;
(function (Infrastructure) {
    describe("Simple Tiles", function () {
        var simpleTile;
        var options;
        describe("given options with colspan enabled", function () {
            beforeEach(function () {
                options = {
                    top: 50,
                    left: 515,
                    workspaceWidth: 1300,
                    workspaceHeight: 900,
                    cascadeMargin: 100,
                    maximumColumnsPerRow: 2
                };
            });
            it('should return height width for 1 cells', function () {
                var totalCells = 1;
                var columnPosition = 1;
                var rowPosition = 1;
                var height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                var width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(options.workspaceHeight);
                expect(width).toBe(options.workspaceWidth);
            });
            it('should return height width for 2 cells', function () {
                var totalCells = 2;
                var columnPosition = 1;
                var rowPosition = 1;
                var height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                var width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(900);
                expect(width).toBe(650);
                columnPosition = 2;
                height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(900);
                expect(width).toBe(650);
            });
            it('should return height width for 3 cells', function () {
                var totalCells = 3;
                var columnPosition = 1;
                var rowPosition = 1;
                var height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                var width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(450);
                expect(width).toBe(650);
                columnPosition = 2;
                height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(450);
                expect(width).toBe(650);
                rowPosition = 2;
                columnPosition = 1;
                height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 1 /* Colspan */);
                expect(height).toBe(450);
                expect(width).toBe(1300);
            });
        });
        describe("given options with rowspan enabled", function () {
            beforeEach(function () {
                options = {
                    top: 50,
                    left: 515,
                    workspaceWidth: 1300,
                    workspaceHeight: 900,
                    cascadeMargin: 100,
                    maximumColumnsPerRow: 2
                };
            });
            it('should return height width for 1 cells', function () {
                var totalCells = 1;
                var columnPosition = 1;
                var rowPosition = 1;
                var height = Infrastructure.SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 2 /* Rowspan */);
                var width = Infrastructure.SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, 2 /* Rowspan */);
                expect(height).toBe(options.workspaceHeight);
                expect(width).toBe(options.workspaceWidth);
            });
            //it('should return height width for 2 cells',() => {
            //    var totalCells = 2;
            //    var columnPosition = 1;
            //    var rowPosition = 1;
            //    var height = SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    var width = SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    expect(height).toBe(900);
            //    expect(width).toBe(650);
            //    columnPosition = 2;
            //    height = SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    width = SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    expect(height).toBe(900);
            //    expect(width).toBe(650);
            //});
            //it('should return height width for 3 cells',() => {
            //    var totalCells = 3;
            //    var columnPosition = 1;
            //    var rowPosition = 1;
            //    var height = SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    var width = SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    expect(height).toBe(450);
            //    expect(width).toBe(650);
            //    columnPosition = 2;
            //    height = SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    width = SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    expect(height).toBe(450);
            //    expect(width).toBe(650);
            //    rowPosition = 2;
            //    columnPosition = 1;
            //    height = SimpleTile.calculateCellTileHeight(options.workspaceHeight, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    width = SimpleTile.calculateCellTileWidth(options.workspaceWidth, totalCells, options.maximumColumnsPerRow, columnPosition, rowPosition, AutoResize.Rowspan);
            //    expect(height).toBe(450);
            //    expect(width).toBe(1300);
            //});
        });
    });
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=simpletiles.tests.js.map