"use strict";
cc._RF.push(module, '31d5e1DFKtHm4do/n3vpEJU', 'Btn');
// scripts/Btn.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    txtDisplay: {
      default: null,
      type: cc.Label
    }
  },
  /**
   * 設定按鈕圖片
   * @param {cc.Texture2D} textures
   */
  setSpriteTextures: function setSpriteTextures(textures) {
    this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(textures);
  },
  /**
   * 設定按鈕文字
   * @param {cc.string} txt
   */
  setTxt: function setTxt(txt) {
    this.txtDisplay.string = txt;
  }
});

cc._RF.pop();