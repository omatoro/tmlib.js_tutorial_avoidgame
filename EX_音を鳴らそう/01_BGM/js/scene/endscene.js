/**
 * EndScene
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
                text: "ここはEndSceneです。",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    var RESULT_PARAM = {
            score: 256,
            msg:      "【タッチゲーム制作チュートリアル】",
            hashtags: ["omatoro", "tmlibチュートリアル"],
            url:      "http://testcording.com",
            width:    ns.SCREEN_WIDTH,
            height:   ns.SCREEN_HEIGHT,
            related:  "tmlib.js Tutorial testcording",
    };

    ns.EndScene = tm.createClass({
        superClass : tm.app.ResultScene,

        init : function(leftTime) {
            // スコア計算
            RESULT_PARAM.score = (leftTime * 100) |0;

            // スコア
            this.superInit(RESULT_PARAM);

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);

            // // 画面(シーンの描画箇所)をタッチした時の動作
            // this.addEventListener("pointingend", function(e) {
            //     // シーンの遷移
            //     e.app.replaceScene(ns.TitleScene());
            // });
        },

        // Backボタンを押したらTitleSceneに戻る
        onnextscene: function (e) {
            e.target.app.replaceScene(ns.TitleScene());
        },
    });

})(game);