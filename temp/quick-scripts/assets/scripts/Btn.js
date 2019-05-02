(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Btn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '31d5e1DFKtHm4do/n3vpEJU', 'Btn', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Btn.js.map
        