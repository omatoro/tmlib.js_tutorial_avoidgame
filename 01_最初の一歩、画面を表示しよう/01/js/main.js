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

    // tmlibの実行
    app.run();
});