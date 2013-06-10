/**
 * MainScene
 */
(function(ns) {

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "label",
                x: 40,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "red",
                text: "ここはMainSceneです。",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    var HEART_SIZE  = 128;
    var HEART_X     = ns.SCREEN_WIDTH/2;
    var HEART_Y     = ns.SCREEN_HEIGHT/2;

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);

            // 画面(シーンの描画箇所)をタッチした時の動作
            this.addEventListener("pointingend", function(e) {
                // シーンの遷移
                e.app.replaceScene(ns.EndScene());
            });

            // ハートを作る
            var heart = tm.app.HeartShape(HEART_SIZE, HEART_SIZE);
            // 表示位置
            heart.position.set(HEART_X, HEART_Y);
            // 表示する
            this.addChild(heart);
        },
    });

})(game);