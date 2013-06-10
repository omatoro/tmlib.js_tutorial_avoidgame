/**
 * ゲーム起動処理
 */
// var game = game || {};

(function(ns) {

    tm.main(function() {
        // // スクリーンサイズ
        // ns.SCREEN_WIDTH  = 640;
        // ns.SCREEN_HEIGHT = 960;

        // アプリケーション作成
        ns.app = tm.app.CanvasApp("#world");
        ns.app.resize(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT); // 画面サイズに合わせる
        ns.app.fitWindow(); // リサイズ対応
        ns.app.background = "rgb(0, 0, 0)"; // 背景色をセット

        // tmlibの実行
        ns.app.run();
    });

})(game);