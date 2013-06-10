/**
 * TitleScene
 */
(function(ns) {

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "タッチゲーム制作チュートリアル",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

            // 画面(シーンの描画箇所)をタッチした時の動作
            this.addEventListener("pointingend", function(e) {
                // シーンの遷移
                e.app.replaceScene(ns.MainScene());
            });
        },
    });

})(game);