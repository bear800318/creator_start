window.__require=function t(e,i,s){function c(o,a){if(!i[o]){if(!e[o]){var r=o.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!a&&h)return h(r,!0);if(n)return n(r,!0);throw new Error("Cannot find module '"+o+"'")}}var u=i[o]={exports:{}};e[o][0].call(u.exports,function(t){return c(e[o][1][t]||t)},u,u.exports,t,e,i,s)}return i[o].exports}for(var n="function"==typeof __require&&__require,o=0;o<s.length;o++)c(s[o]);return c}({Btn:[function(t,e,i){"use strict";cc._RF.push(e,"31d5e1DFKtHm4do/n3vpEJU","Btn"),cc.Class({extends:cc.Component,properties:{txtDisplay:{default:null,type:cc.Label}},setSpriteTextures:function(t){this.node.getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(t)},setTxt:function(t){this.txtDisplay.string=t}}),cc._RF.pop()},{}],Game:[function(t,e,i){"use strict";cc._RF.push(e,"43b54wjkf9Co7MWUvB8cNdm","Game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},heartPrefab:{default:null,type:cc.Prefab},addScorePrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,maxHeart:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,type:cc.AudioClip},timeDisplay:{default:null,type:cc.Label},progressBarDisplay:{default:null,type:cc.ProgressBar}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.heartAry=[],this.heart=this.maxHeart,this.creatNewStar(),this.updateHeartCount(),window.score=0,this.player.active=!0,window.stasus="GO"},creatNewStar:function(){var t=this.getNewStarPosition(),e=cc.instantiate(this.starPrefab);this.node.addChild(e),e.setPosition(t),e.getComponent("Star").game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0,this.progressBarDisplay.node.x=t.x,this.progressBarDisplay.node.y=t.y-48},updateHeartCount:function(){if(0==this.heartAry.length)for(var t=0;t<this.maxHeart;t++){var e=cc.instantiate(this.heartPrefab);this.node.addChild(e),e.setPosition(cc.v2(this.scoreDisplay.node.x+t*e.width,this.scoreDisplay.node.y-this.scoreDisplay.node.height-5)),this.heartAry[t]=e}else for(var i=this.maxHeart-1;i>this.heart-1;i--)this.heartAry[i].color=cc.color(70,70,70,255)},setProgressRate:function(t){this.progressBarDisplay.progress=1-t/this.starDuration},playScoreAnime:function(t,e){var i=cc.instantiate(this.addScorePrefab);this.node.addChild(i),i.setPosition(cc.v2(t+20,e+20)),i.getComponent("Score").game=this},getNewStarPosition:function(){var t,e=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,i=this.node.width/2;return t=2*(Math.random()-.5)*i,cc.v2(t,e)},update:function(t){if("GO"==window.stasus){if(this.timer>this.starDuration){if(this.heart--,this.updateHeartCount(),0==this.heart)return this.gameOver(),void(this.enabled=!1);this.timer=0}this.timer+=t,this.timeDisplay.string="Time: "+Math.ceil(this.timer),this.setProgressRate(this.timer)}},gainScore:function(){window.score+=1,this.scoreDisplay.string="Score: "+window.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},gameOver:function(){window.stasus="GameOver",this.player.stopAllActions(),cc.director.loadScene("Start")}}),cc._RF.pop()},{}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"40cb5LzkRlOcq2QFF66XmDl","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,squashDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.enabled=!1,this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.minPosX=-this.node.parent.width/2,this.maxPosX=this.node.parent.width/2,this.jumpAction=this.setJumpAction(),this.startMoveAt(this.node.getPosition()),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);var t=cc.Canvas.instance.node;t.on("touchstart",this.onTouchStart,this),t.on("touchend",this.onTouchEnd,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);var t=cc.Canvas.instance.node;t.off("touchstart",this.onTouchStart,this),t.off("touchend",this.onTouchEnd,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.accLeft=!0,this.accRight=!1;break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.accLeft=!1,this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.accLeft=!1;break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.accRight=!1}},onTouchStart:function(t){t.getLocation().x>=cc.winSize.width/2?(this.accLeft=!1,this.accRight=!0):(this.accLeft=!0,this.accRight=!1)},onTouchEnd:function(t){this.accLeft=!1,this.accRight=!1},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.scaleTo(this.squashDuration,1,.6),s=cc.scaleTo(this.squashDuration,1,1.2),c=cc.scaleTo(this.squashDuration,1,1),n=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(i,s,t,c,e,n))},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},getCenterPos:function(){return cc.v2(this.node.x,this.node.y+this.node.height/2)},startMoveAt:function(t){this.enabled=!0,this.xSpeed=0,this.node.setPosition(t),this.node.runAction(this.setJumpAction())},stopMove:function(){this.node.stopAllActions()},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),this.accRight||this.accLeft||(this.xSpeed<0&&(this.xSpeed+=this.accel*t),this.xSpeed>0&&(this.xSpeed-=this.accel*t)),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.node.parent.width/2-this.node.width/2?(this.node.x=this.node.parent.width/2-this.node.width/2,this.xSpeed=0):this.node.x<-this.node.parent.width/2+this.node.width/2&&(this.node.x=-this.node.parent.width/2+this.node.width/2,this.xSpeed=0)}}),cc._RF.pop()},{}],Score:[function(t,e,i){"use strict";cc._RF.push(e,"8c7bceNe5hEJKiqhmEm8hkh","Score"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.timer=0;var t=cc.callFunc(function(){this.node.stopAction(),this.node.destroy()},this,100);this.node.scaleX=0,this.node.scaleY=0;var e=cc.sequence(cc.spawn(cc.moveBy(.2,0,10),cc.scaleTo(.2,1,1)),cc.fadeOut(1),t);this.node.runAction(e)}}),cc._RF.pop()},{}],Start:[function(t,e,i){"use strict";cc._RF.push(e,"1691an3j1pFcL3Wsq21P7bP","Start"),cc.Class({extends:cc.Component,properties:{btnTextures:{default:null,type:cc.Texture2D},btnTxt:"123",btnPrefab:{default:null,type:cc.Prefab},gameOverDisplay:{default:null,type:cc.Label},scoreDisplay:{default:null,type:cc.Label}},onLoad:function(){"GameOver"==window.stasus?(this.gameOverDisplay.node.active=!0,this.scoreDisplay.string="Score: "+window.score):(this.gameOverDisplay.node.active=!1,this.scoreDisplay.string="");var t=cc.instantiate(this.btnPrefab);this.node.addChild(t),t.getComponent("Btn").setSpriteTextures(this.btnTextures),t.getComponent("Btn").setTxt(this.btnTxt),t.on("click",this.callback,this)},callback:function(){cc.director.loadScene("game")}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"333aePg6B9NlJ1Wwgo8c9No","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0,scoreDisplay:{default:null,type:cc.Label}},getPlayerDistance:function(){var t=this.game.player.getPosition();return this.node.position.sub(t).mag()},onPicked:function(){this.game.creatNewStar(),this.game.gainScore(),this.node.destroy()},update:function(t){if(this.getPlayerDistance()<this.pickRadius)return this.game.playScoreAnime(this.node.x,this.node.y),void this.onPicked();var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e)}}),cc._RF.pop()},{}]},{},["Btn","Game","Player","Score","Star","Start"]);