/**
 * ゲーム用定数作成
 */
var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 640;

/**
 * リソースの読み込み
 */
var ASSETS = {
    "player":   "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/[Animal]Chicken.png",
    "playerSS": "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/playerSS.tmss",
    "enemy":    "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/[Monster]Dragon_B_pochi.png",
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
var UI_DATA = {
    LABELS: {
        children: [{
            type: "Label",
            name: "timeLabel",
            x: 200,
            y: 120,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            text: "残り時間を表示する",
            fontSize: 40,
            align: "left"
        }]
    }
};
tm.define("MainScene", {
    superClass : "tm.app.Scene",

    init : function() {
        this.superInit();

        // Map
        this.map = Map().addChildTo(this);
        this.map.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);

        // Player
        this.player = Player().addChildTo(this);
        this.player.position.set(150, 600);

        // enemy
        this.enemyGroup = tm.app.CanvasElement().addChildTo(this);

        // スコア用カウントアップ
        this.timer = 0;

        // ラベル表示
        this.fromJSON(UI_DATA.LABELS);

        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            // シーンの遷移
            e.app.replaceScene(EndScene());
        });
    },

    update: function (app) {
        // カウントアップを行う
        ++this.timer;

        // 敵の生成(難易度をどんどん上げる)
        for (var i = (this.timer / 300); i > 0; --i) {
            if (this.timer % 30 == 0) {
                var enemy = Enemy().addChildTo(this.enemyGroup);
                enemy.x = Math.rand(0, SCREEN_WIDTH);
                enemy.y = 0 - enemy.height;
            }
        }
    },
});


/**
 * EndScene
 */
var RESULT_PARAM = {
        score: 256,
        msg:      "【避けゲー制作チュートリアル】",
        hashtags: ["omatoro", "tmlibチュートリアル"],
        url:      "http://omatoro.github.io/tmlib.js_tutorial_avoidgame/",
        width:    SCREEN_WIDTH,
        height:   SCREEN_HEIGHT,
        related:  "tmlib.js Tutorial testcording",
};

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
var PLAYER_WIDTH  = 20;
var PLAYER_HEIGHT = 16;
tm.define("Player", {
    superClass: "tm.app.AnimationSprite",

    init: function () {
        this.superInit("playerSS", PLAYER_WIDTH*4, PLAYER_HEIGHT*4);
        this.gotoAndPlay("left");
    },
});


/*
 * enemy
 */
var ENEMY_WIDTH  = 38;
var ENEMY_HEIGHT = 30;
tm.define("Enemy", {
    superClass: "tm.app.Sprite",

    init: function() {
        this.superInit("enemy", ENEMY_WIDTH*4, ENEMY_HEIGHT*4);
        this.speed = Math.rand(6, 12);
    },

    update: function() {
        this.y += this.speed;

        // 画面から見えなくなったら消す
        if (this.y > SCREEN_HEIGHT + this.height) {
            this.remove();
        }
    }
});


/*
 * Map
 */
tm.define("Map", {
    superClass: "tm.app.Sprite",

    init: function() {
        this.superInit("backMap", SCREEN_WIDTH, SCREEN_HEIGHT);
    },
});