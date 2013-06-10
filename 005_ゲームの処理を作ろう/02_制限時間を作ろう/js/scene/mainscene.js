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
            },{
                type: "Label",
                name: "limitTimeLabel",
                x: 200,
                y: 120,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 40,
                align: "left"
            }]
        }
    };

    var HEART_SIZE  = 64;
    var HEART_NUM   = 10;
    var HEART_PARAM = {
        fillStyle: "pink",
    };

    var LIMIT_TIME = 300; // 10秒 x 30フレーム = 300

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);

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

            // 制限時間
            this.limitTime = LIMIT_TIME;
        },

        update: function (app) {
            // カウントダウンを行う
            --this.limitTime;

            // 制限時間を表示する
            this.limitTimeLabel.text = "残り時間 : " + ((this.limitTime / 30) |0);

            // 制限時間がなくなったらEndSceneに遷移する
            if (this.limitTime <= 0) {
                app.replaceScene(ns.EndScene());
            }
        },
    });

})(game);