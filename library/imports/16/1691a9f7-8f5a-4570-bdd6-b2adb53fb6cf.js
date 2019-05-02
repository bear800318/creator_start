"use strict";
cc._RF.push(module, '1691an3j1pFcL3Wsq21P7bP', 'Start');
// scripts/Start.js

"use strict";

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

  onLoad: function onLoad() {
    if (window.stasus == "GameOver") {
      this.gameOverDisplay.node.active = true;
      this.scoreDisplay.string = "Score: " + window.score;
    } else {
      this.gameOverDisplay.node.active = false;
      this.scoreDisplay.string = "";
    }
    var btn = cc.instantiate(this.btnPrefab);
    this.node.addChild(btn);
    btn.getComponent("Btn").setSpriteTextures(this.btnTextures);
    btn.getComponent("Btn").setTxt(this.btnTxt);
    btn.on("click", this.callback, this);
  },


  callback: function callback() {
    //切場景
    cc.director.loadScene("game");
  }
});

cc._RF.pop();