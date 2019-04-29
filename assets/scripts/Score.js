cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.timer = 0;

    var finished = cc.callFunc(
      function() {
        this.node.stopAction();
        this.node.destroy();
      },
      this,
      100
    );
    this.node.scaleX = 0;
    this.node.scaleY = 0;
    var action = cc.sequence(
      cc.spawn(cc.moveBy(0.2, 0, 10), cc.scaleTo(0.2, 1, 1)),
      cc.fadeOut(1),
      finished
    );
    this.node.runAction(action);
  }
});
