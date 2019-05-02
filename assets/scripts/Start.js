cc.Class({
  extends: cc.Component,

  properties: {
    btnTextures: {
      default: null,
      type: cc.Texture2D
    },
    btnTxt: "123",
    btnPrefab: {
      default: null,
      type: cc.Prefab
    },
    gameOverDisplay: {
      default: null,
      type: cc.Label
    },
    scoreDisplay: {
      default: null,
      type: cc.Label
    }
  },

  onLoad() {
    if (window.stasus == "GameOver") {
      this.gameOverDisplay.node.active = true;
      this.scoreDisplay.string = "Score: " + window.score;
    } else {
      this.gameOverDisplay.node.active = false;
      this.scoreDisplay.string = "";
    }
    let btn = cc.instantiate(this.btnPrefab);
    this.node.addChild(btn);
    btn.getComponent("Btn").setSpriteTextures(this.btnTextures);
    btn.getComponent("Btn").setTxt(this.btnTxt);
    btn.on("click", this.callback, this);
  },

  callback: function() {
    //切場景
    cc.director.loadScene("game");
  }
});
