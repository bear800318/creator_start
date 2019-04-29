"use strict";
cc._RF.push(module, '8c7bceNe5hEJKiqhmEm8hkh', 'Score');
// scripts/Score.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad: function onLoad() {
    this.timer = 0;

    var finished = cc.callFunc(function () {
      this.node.stopAction();
      this.node.destroy();
    }, this, 100);
    this.node.scaleX = 0;
    this.node.scaleY = 0;
    var action = cc.sequence(cc.spawn(cc.moveBy(0.2, 0, 10), cc.scaleTo(0.2, 1, 1)), cc.fadeOut(1), finished);
    this.node.runAction(action);
  }
});

cc._RF.pop();