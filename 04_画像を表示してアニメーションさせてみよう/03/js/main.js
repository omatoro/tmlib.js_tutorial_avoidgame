/**
 * ゲーム用定数作成
 */
var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 640;
var RESULT_PARAM = {
        score: 256,
        msg:      "【避けゲー制作チュートリアル】",
        hashtags: ["omatoro", "tmlibチュートリアル"],
        url:      "http://omatoro.github.io/tmlib.js_tutorial_avoidgame/",
        width:    SCREEN_WIDTH,
        height:   SCREEN_HEIGHT,
        related:  "tmlib.js Tutorial testcording",
};
var UI_DATA = {
    main: { // MainScene用ラベル
        children: [{
            type: "Label",
            name: "timeLabel",
            x: 200,
            y: 120,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            // text: "残り時間を表示する",
            text: " ",
            fontSize: 40,
            align: "left"
        }]
    }
};
var PLAYER_WIDTH  = 20;
var PLAYER_HEIGHT = 16;

/**
 * リソースの読み込み
 */
var ASSETS = {
    "player":   "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/[Animal]Chicken.png",
    "playerSS": "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/playerSS.tmss",
    "backMap":  "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/map.png",
};

/**
 * ゲーム起動処理
 */
tm.main(function() {
    // アプリケーション作成
    var app = tm.app.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT); // 画面サイズに合わせる
    app.fitWindow(); // リサイズ対応
    app.background = "rgb(0, 0, 0)"; // 背景色をセット

    var loadingScene = tm.app.LoadingScene({
        assets: ASSETS,
        nextScene: TitleScene,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });

    // シーンの切り替え
    app.replaceScene(loadingScene);

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

        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            // シーンの遷移
            e.app.replaceScene(MainScene());
        });
    },
});


/**
 * MainScene
 */
tm.define("MainScene", {
    superClass : "tm.app.Scene",

    init : function() {
        this.superInit();

        // Map
        this.map = tm.app.Sprite("backMap", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
        this.map.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);

        // Player
        this.player = Player().addChildTo(this);
        this.player.position.set(150, 600);

        // ラベル表示
        this.fromJSON(UI_DATA.main);

        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            // シーンの遷移
            e.app.replaceScene(EndScene());
        });
    },
});


/**
 * EndScene
 */
tm.define("EndScene", {
    superClass : "tm.app.ResultScene",

    init : function() {
        this.superInit(RESULT_PARAM);
    },

    // Backボタンを押したらTitleSceneに戻る
    onnextscene: function (e) {
        e.target.app.replaceScene(TitleScene());
    },
});


/*
 * player
 */
tm.define("Player", {
    superClass: "tm.app.AnimationSprite",

    init: function () {
        this.superInit("playerSS", PLAYER_WIDTH*4, PLAYER_HEIGHT*4);
        this.gotoAndPlay("left");
    },
});
