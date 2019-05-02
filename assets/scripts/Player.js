cc.Class({
  extends: cc.Component,

  properties: {
    // 主角跳跃高度
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 辅助形变动作时间
    squashDuration: 0,
    // 最大移动速度
    maxMoveSpeed: 0,
    // 加速度
    accel: 0,
    // 跳跃音效资源
    jumpAudio: {
      default: null,
      type: cc.AudioClip
    }
  },

  // use this for initialization
  onLoad: function() {
    this.enabled = false;

    this.accLeft = false;
    this.accRight = false;

    this.xSpeed = 0;

    this.minPosX = -this.node.parent.width / 2;
    this.maxPosX = this.node.parent.width / 2;

    this.jumpAction = this.setJumpAction();
    this.startMoveAt(this.node.getPosition());

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    let touchReceiver = cc.Canvas.instance.node;
    touchReceiver.on("touchstart", this.onTouchStart, this);
    touchReceiver.on("touchend", this.onTouchEnd, this);
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    let touchReceiver = cc.Canvas.instance.node;
    touchReceiver.off("touchstart", this.onTouchStart, this);
    touchReceiver.off("touchend", this.onTouchEnd, this);
  },

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = true;
        this.accRight = false;
        break;
      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.accLeft = false;
        this.accRight = true;
        break;
    }
  },

  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.accRight = false;
        break;
    }
  },

  onTouchStart(event) {
    let touchLoc = event.getLocation();
    if (touchLoc.x >= cc.winSize.width / 2) {
      this.accLeft = false;
      this.accRight = true;
    } else {
      this.accLeft = true;
      this.accRight = false;
    }
  },

  onTouchEnd(event) {
    this.accLeft = false;
    this.accRight = false;
  },

  setJumpAction: function() {
    let jumpUp = cc
      .moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))
      .easing(cc.easeCubicActionOut());

    let jumpDown = cc
      .moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight))
      .easing(cc.easeCubicActionIn());

    let squash = cc.scaleTo(this.squashDuration, 1, 0.6);
    let stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
    let scaleBack = cc.scaleTo(this.squashDuration, 1, 1);
    let callback = cc.callFunc(this.playJumpSound, this);
    return cc.repeatForever(
      cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callback)
    );
  },

  playJumpSound: function() {
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },

  getCenterPos: function() {
    let centerPos = cc.v2(this.node.x, this.node.y + this.node.height / 2);
    return centerPos;
  },

  startMoveAt: function(pos) {
    this.enabled = true;
    this.xSpeed = 0;
    this.node.setPosition(pos);
    this.node.runAction(this.setJumpAction());
  },

  stopMove: function() {
    this.node.stopAllActions();
  },

  update: function(dt) {
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }

    if (!this.accRight && !this.accLeft) {
      if (this.xSpeed < 0) {
        this.xSpeed += this.accel * dt;
      }
      if (this.xSpeed > 0) {
        this.xSpeed -= this.accel * dt;
      }
    }

    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = (this.maxMoveSpeed * this.xSpeed) / Math.abs(this.xSpeed);
    }

    this.node.x += this.xSpeed * dt;
    if (this.node.x > this.node.parent.width / 2 - this.node.width / 2) {
      this.node.x = this.node.parent.width / 2 - this.node.width / 2;
      this.xSpeed = 0;
    } else if (
      this.node.x <
      -this.node.parent.width / 2 + this.node.width / 2
    ) {
      this.node.x = -this.node.parent.width / 2 + this.node.width / 2;
      this.xSpeed = 0;
    }
  }
});
