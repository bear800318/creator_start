(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8c7bceNe5hEJKiqhmEm8hkh', 'Score', __filename);
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
        //# sourceMappingURL=Score.js.map
        