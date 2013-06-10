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

    var HEART_SIZE  = 64;
    var HEART_NUM   = 10;

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

            // たくさんハートを作る
            for (var i = 0; i < HEART_NUM; ++i) {
                // ハートを作る
                var heart = tm.app.HeartShape(HEART_SIZE, HEART_SIZE);
                // 表示位置
                heart.position.set(
                        Math.rand(HEART_SIZE/2, ns.SCREEN_WIDTH  - HEART_SIZE/2),
                        Math.rand(HEART_SIZE/2, ns.SCREEN_HEIGHT - HEART_SIZE/2));
                // 表示する
                this.addChild(heart);
            }
        },
    });

})(game);