/**
 * ゲーム用定数作成
 */
var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 640;

/**
 * ゲーム起動処理
 */
tm.main(function() {
    // アプリケーション作成
    var app = tm.app.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT); // 画面サイズに合わせる
    app.fitWindow(); // リサイズ対応
    app.background = "rgb(0, 0, 0)"; // 背景色をセット

    // シーンの切り替え
    app.replaceScene(TitleScene());

    // tmlibの実行
    app.run();
});


/**
 * TitleScene
 */
tm.define("TitleScene", {
    superClass : "tm.app.TitleScene",

    init : function() {
        this.superInit({
            title :  "避けゲー制作チュートリアル",
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT
        });
    },
});