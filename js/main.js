/**
 * ゲーム用ネームスペース作成、定数作成
 */
var game = game || {};

var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 640;

/**
 * リソースの読み込み
 */
var ASSETS = {
    "player":   "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/[Animal]Chicken.png",
    "playerSS": "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/playerSS.tmss",
    "enemy":    "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/[Monster]Dragon_B_pochi.png",
    "bgm":      "http://rawgithub.com/omatoro/tmlib.js_tutorial_avoidgame/gh-pages/rsc/Comical01_Koya_short2.mp3",
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
    superClass : tm.app.TitleScene,

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
            text: " ",
            fontSize: 40,
            align: "left"
        }]
    }
};
tm.define("MainScene", {
    superClass : tm.app.Scene,

    init : function() {
        this.superInit();

        // BGM再生
        this.bgm = tm.asset.AssetManager.get("bgm");
        this.bgm.setVolume(1.0).setLoop(true).play();

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
    },

    update: function (app) {
        // カウントアップを行う
        ++this.timer;

        // 制限時間を表示する
        this.timeLabel.text = "生き残ってる時間 : " + ((this.timer / 30) |0);

        // 敵の生成(難易度をどんどん上げる)
        for (var i = (this.timer / 300); i > 0; --i) {
            if (this.timer % 30 == 0) {
                var enemy = Enemy().addChildTo(this.enemyGroup);
                enemy.x = Math.rand(0, SCREEN_WIDTH);
                enemy.y = 0 - enemy.height;
            }
        }

        var self = this;
        var ec = this.enemyGroup.children;
        ec.each(function(enemy) {
            if (self.player.isHitElement(enemy)) {
                self.bgm.stop();
                app.replaceScene(EndScene(self.timer))
            };
        });
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
    superClass : tm.app.ResultScene,

    init : function(time) {
        // スコア計算
        RESULT_PARAM.score = (time * 100) |0;

        // スコア
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
var GROUND_LIMIT_LEFT  = PLAYER_WIDTH/2;
var GROUND_LIMIT_RIGHT = SCREEN_WIDTH - PLAYER_WIDTH/2;
tm.define("Player", {
    superClass: "tm.app.AnimationSprite",

    init: function () {
        this.superInit("playerSS", PLAYER_WIDTH*4, PLAYER_HEIGHT*4);
        // 移動の方向を保持
        this.direct = "left";
    },

    update: function (app) {
        // 移動処理
        if (app.pointing.getPointingStart()) {
            this.direct = (this.direct === "left") ? "right" : "left";
        }
        switch (this.direct) {
            case "left":
                this.moveLeft();
                break;
            case "right":
                this.moveRight();
                break;
        }

        // 画面からはみ出ないようにする
        if (this.x < GROUND_LIMIT_LEFT) {
            this.x = GROUND_LIMIT_LEFT;
        }
        if (this.x > GROUND_LIMIT_RIGHT) {
            this.x = GROUND_LIMIT_RIGHT;
        }
    },

    moveLeft: function () {
        this.gotoAndPlay("left");
        this.x -= 4;
    },

    moveRight: function () {
        this.gotoAndPlay("right");
        this.x += 4;
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
    superClass: tm.app.Sprite,

    init: function() {
        this.superInit("backMap", SCREEN_WIDTH, SCREEN_HEIGHT);
    },
});