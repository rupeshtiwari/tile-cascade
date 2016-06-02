/// <reference path="simpletiles/cells.ts" />
/// <reference path="simpletiles/rows.ts" />
/// <reference path="simpletiles/simpletiles.ts" />
/// <reference path="scripts/typings/jasmine.d.ts" />
var Infrastructure;
(function (Infrastructure) {
    describe("Simple Tiles", function () {
        var simpleTile;
        var options;
        var tiles;
        it('should give tiles for 5 windows', function () {
            options = {
                top: 8,
                left: 510,
                margin: 20,
                height: 400,
                width: 400,
                workspaceWidth: 1300
            };
            simpleTile = new Infrastructure.SimpleTile(options);
            tiles = simpleTile.tile(5);
            var tileStr = "{\"cells\":[{\"top\":8,\"left\":530,\"index\":1},{\"top\":8,\"left\":950,\"index\":2},{\"top\":8,\"left\":1370,\"index\":3},{\"top\":420,\"left\":530,\"index\":4},{\"top\":420,\"left\":950,\"index\":5}]}";
            expect(JSON.stringify(tiles)).toEqual(tileStr);
        });
        it('should give tiles for 7 windows', function () {
            options = {
                top: 8,
                left: 510,
                margin: 20,
                height: 400,
                width: 400,
                workspaceWidth: 1300
            };
            simpleTile = new Infrastructure.SimpleTile(options);
            tiles = simpleTile.tile(7);
            var tileStr = "{\"cells\":[{\"top\":8,\"left\":530,\"index\":1},{\"top\":8,\"left\":950,\"index\":2},{\"top\":8,\"left\":1370,\"index\":3},{\"top\":420,\"left\":530,\"index\":4},{\"top\":420,\"left\":950,\"index\":5},{\"top\":420,\"left\":1370,\"index\":6},{\"top\":840,\"left\":530,\"index\":7}]}";
            expect(JSON.stringify(tiles)).toEqual(tileStr);
        });
    });
})(Infrastructure || (Infrastructure = {}));
//# sourceMappingURL=simpletiles.tests.js.map