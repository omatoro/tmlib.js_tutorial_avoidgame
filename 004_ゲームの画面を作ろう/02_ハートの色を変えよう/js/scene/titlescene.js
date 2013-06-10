/**
 * TitleScene
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
                text: "ここはTitleSceneです。",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "タッチゲーム制作チュートリアル",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);

            // 画面(シーンの描画箇所)をタッチした時の動作
            this.addEventListener("pointingend", function(e) {
                // シーンの遷移
                e.app.replaceScene(ns.MainScene());
            });
        },
    });

})(game);