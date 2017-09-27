import * as Pixi from "pixi.js"
import Keyb from "keyb"

var WALKING_1_TEXTURE = undefined
var WALKING_2_TEXTURE = undefined
var JUMPING_1_TEXTURE = undefined
var JUMPING_2_TEXTURE = undefined
var TRAIL_TEXTURE = undefined

var GRAVITY = 0.5
var JUMP_FORCE = -10
var SPIN_FORCE = Math.PI * 3
var SPIN_ON_NTH_JUMP = 5
var SQUEEZE = 0.05

const MESSAGE = document.getElementById("message")

import {COLORS} from "scripts/Constants.js"
import {FRAME} from "scripts/Constants.js"

export default class Player extends Pixi.Sprite {
    constructor() {
        WALKING_1_TEXTURE = WALKING_1_TEXTURE || Pixi.Texture.from(require("images/kitty-up.png"))
        WALKING_2_TEXTURE = WALKING_2_TEXTURE || Pixi.Texture.from(require("images/kitty-down.png"))
        JUMPING_1_TEXTURE = JUMPING_1_TEXTURE || Pixi.Texture.from(require("images/kitty-jump-open.png"))
        JUMPING_2_TEXTURE = JUMPING_2_TEXTURE || Pixi.Texture.from(require("images/kitty-jump-close.png"))
        super(WALKING_1_TEXTURE)

        this.tint = COLORS[1]

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = FRAME.WIDTH / 5
        this.position.y = 0

        this.velocity = {x: +3.5, y: 0, r: 0}

        this.time = 0
        this.jumpcount = 0
        this.bam = 0

        this.score = 0
    }
    update(delta) {
        this.time += delta.ms

        // Deceleration of spin
        this.velocity.r -= GRAVITY
        if(this.velocity.r < 0) {
            this.velocity.r = 0
        }

        // Deceleration of jump
        if(this.position.y < 0) {
            this.velocity.y += GRAVITY
        }

        // Diffusion of bam
        if(this.bam > 0) {
            this.bam -= delta.ms
            if(this.bam < 0) {
                this.bam = 0
            }
        }

        // Collision with ground
        if(this.position.y + this.velocity.y > 0) {
            this.bam = 100
            this.position.y = 0
            this.velocity.y = 0
        }

        // Polling for inputs
        if(Keyb.isDown("<space>")) {
            if(this.position.y == 0) {
                this.velocity.y = JUMP_FORCE
                // this.rotation = Math.random() * (Math.PI / 2) - (Math.PI / 4)

                this.jumpcount += 1
                if(this.jumpcount % SPIN_ON_NTH_JUMP == 0) {
                    this.velocity.r = SPIN_FORCE
                }
            }
        }

        // Translation via velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.rotation += this.velocity.r

        // Effects while jumping
        if(this.position.y == 0) {
            this.texture = WALKING_1_TEXTURE
            this.rotation = Math.sin(this.time / 100) * (Math.PI / 8)
        } else {
            this.texture = JUMPING_1_TEXTURE
        }

        if(this.velocity.y < 0) {
            this.scale.x = 1 - SQUEEZE
            this.scale.y = 1 + SQUEEZE
        } else if(this.velocity.y > 0) {
            this.scale.x = 1 + SQUEEZE
            this.scale.y = 1 - SQUEEZE
        } else {
            this.scale.x = 1
            this.scale.y = 1
        }
    }
    woohoo(pianokey) {
        this.tint = COLORS[pianokey.glyph]

        this.score += 1
        MESSAGE.innerHTML = this.score

        this.parent.addChild(new Trail(this.position, this.tint, this.score / 16))
    }
}

class Trail extends Pixi.Sprite {
    constructor(position, tint, timer) {
        TRAIL_TEXTURE = TRAIL_TEXTURE || Pixi.Texture.from(require("images/trail.png"))
        super(TRAIL_TEXTURE)

        this.position.x = position.x
        this.position.y = position.y
        this.tint = tint

        this.timer = timer
        this.positions = []

        this.anchor.x = 0.5
        this.anchor.y = 0.25
        this.stack = -1 - (timer * 0.01)
    }
    update(delta) {
        if(this.parent.player != undefined) {
            this.positions.push({
                x: this.parent.player.position.x,
                y: this.parent.player.position.y,
                r: this.parent.player.rotation
            })
        }

        this.timer -= delta.s
        if(this.timer <= 0) {
            this.timer = 0

            var position = this.positions.shift()
            this.position = new Pixi.Point(position.x, position.y)
            this.rotation = position.r
        }
    }
}
