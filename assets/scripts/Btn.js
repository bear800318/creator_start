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
  setSpriteTextures: function(textures) {
    this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(
      textures
    );
  },
  /**
   * 設定按鈕文字
   * @param {cc.string} txt
   */
  setTxt: function(txt) {
    this.txtDisplay.string = txt;
  }
});
