/**
 * EndScene
 */
(function(ns) {

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

        init : function() {
            // スコア
            this.superInit(RESULT_PARAM);
        },
    });

})(game);