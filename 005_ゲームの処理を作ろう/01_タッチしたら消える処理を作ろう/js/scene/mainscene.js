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
    var HEART_PARAM = {
        fillStyle: "pink",
    };

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);

            // 画面(シーンの描画箇所)をタッチした時の動作
            // this.addEventListener("pointingend", function(e) {
            //     // シーンの遷移
            //     e.app.replaceScene(ns.EndScene());
            // });

            // たくさんハートを作る
            for (var i = 0; i < HEART_NUM; ++i) {
                // 色をつくる
                HEART_PARAM.fillStyle = tm.graphics.Color.createStyleHSLA(Math.rand(0, 360), 95, 75, 0.8);

                // ハートを作る
                var heart = tm.app.HeartShape(
                        HEART_SIZE, 
                        HEART_SIZE, 
                        HEART_PARAM);
                // 表示位置
                heart.position.set(
                        Math.rand(HEART_SIZE/2, ns.SCREEN_WIDTH  - HEART_SIZE/2),
                        Math.rand(HEART_SIZE/2, ns.SCREEN_HEIGHT - HEART_SIZE/2));

                // ハートをタッチした時の処理を作る
                heart.interaction.enabled = true;           // ヒット判定フラグをON
                heart.interaction.boundingType = "circle";  // 円形のヒット判定を行う
                heart.addEventListener("pointingend", function() {
                    // 消す
                    this.remove();
                });

                // 表示する
                this.addChild(heart);
            }
        },
    });

})(game);