cc.Class({
  extends: cc.Component,

  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      default: null,
      type: cc.Prefab
    },
    heartPrefab: {
      default: null,
      type: cc.Prefab
    },
    //
    addScorePrefab: {
      default: null,
      type: cc.Prefab
    },

    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    maxHeart: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      default: null,
      type: cc.Node
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      default: null,
      type: cc.Node
    },

    // score label 的引用
    scoreDisplay: {
      default: null,
      type: cc.Label
    },
    // 得分音效资源
    scoreAudio: {
      default: null,
      type: cc.AudioClip
    },

    timeDisplay: {
      default: null,
      type: cc.Label
    },

    progressBarDisplay: {
      default: null,
      type: cc.ProgressBar
    }
  },

  onLoad: function() {
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.heartAry = [];
    this.heart = this.maxHeart;
    this.creatNewStar();
    this.updateHeartCount();
    window.score = 0;
    this.player.active = true;
    window.stasus = "GO";
  },
  /** 創建星星 */
  creatNewStar: function() {
    let newPosition = this.getNewStarPosition();
    let newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(newPosition);
    newStar.getComponent("Star").game = this;
    this.starDuration =
      this.minStarDuration +
      Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
    this.progressBarDisplay.node.x = newPosition.x;
    this.progressBarDisplay.node.y = newPosition.y - 48;
  },
  /** 更新愛心數 */
  updateHeartCount: function() {
    if (this.heartAry.length == 0) {
      for (let i = 0; i < this.maxHeart; i++) {
        let newHeart = cc.instantiate(this.heartPrefab);
        this.node.addChild(newHeart);
        newHeart.setPosition(
          cc.v2(
            this.scoreDisplay.node.x + i * newHeart.width,
            this.scoreDisplay.node.y - this.scoreDisplay.node.height - 5
          )
        );
        this.heartAry[i] = newHeart;
      }
    } else {
      for (let i = this.maxHeart - 1; i > this.heart - 1; i--) {
        this.heartAry[i].color = cc.color(70, 70, 70, 255);
      }
    }
  },

  setProgressRate(time) {
    this.progressBarDisplay.progress = 1 - time / this.starDuration;
  },

  /**
   * 加分動畫
   * @param {*} startX
   * @param {*} startY
   */
  playScoreAnime: function(startX, startY) {
    let newScore = cc.instantiate(this.addScorePrefab);
    this.node.addChild(newScore);
    newScore.setPosition(cc.v2(startX + 20, startY + 20));
    newScore.getComponent("Score").game = this;
  },

  getNewStarPosition: function() {
    let randX = 0;
    let randY =
      this.groundY +
      Math.random() * this.player.getComponent("Player").jumpHeight +
      50;
    let maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    return cc.v2(randX, randY);
  },

  update: function(dt) {
    if (window.stasus == "GO") {
      if (this.timer > this.starDuration) {
        this.heart--;
        this.updateHeartCount();
        if (this.heart == 0) {
          this.gameOver();
          this.enabled = false;
          return;
        } else {
          this.timer = 0;
        }
      }
      this.timer += dt;
      this.timeDisplay.string = "Time: " + Math.ceil(this.timer);
      this.setProgressRate(this.timer);
    }
  },

  gainScore: function() {
    window.score += 1;
    // 更新 scoreDisplay Label 的文字
    this.scoreDisplay.string = "Score: " + window.score;
    // 播放得分音效
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },

  gameOver: function() {
    window.stasus = "GameOver";
    this.player.stopAllActions(); //停止 player 节点的跳跃动作
    cc.director.loadScene("Start");
  }
});
