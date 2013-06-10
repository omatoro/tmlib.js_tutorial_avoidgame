/**
 * MainScene
 */
(function(ns) {

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // 画面(シーンの描画箇所)をタッチした時の動作
            this.addEventListener("pointingend", function(e) {
                // シーンの遷移
                e.app.replaceScene(ns.EndScene());
            });
        },
    });

})(game);