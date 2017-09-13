import * as Pixi from "pixi.js"
import Keyb from "keyb"

var IDLE_TEXTURE = undefined
var HAPPY_TEXTURE = undefined

var GRAVITY = 0.5
var JUMP_FORCE = -10
var SPIN_FORCE = Math.PI * 3
var SPIN_ON_NTH_JUMP = 5

var SQUEEZE = 0.2

import {MAIN_COLORS} from "scripts/Constants.js"

import {FRAME} from "scripts/Constants.js"

export default class Player extends Pixi.Sprite {
    constructor() {
        IDLE_TEXTURE = IDLE_TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        HAPPY_TEXTURE = HAPPY_TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        super(IDLE_TEXTURE)

        this.tint = MAIN_COLORS[0]

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = FRAME.WIDTH / 5
        this.position.y = 0

        this.velocity = {x: +3.5, y: 0, r: 0}

        this.time = 0
        this.jumpcount = 0
        this.bam = 0
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

        // Collision with ground
        if(this.position.y > 0) {
            this.bam = 100
            this.position.y = 0
            this.velocity.y = 0
        }

        // Effects while jumping
        if(this.position.y == 0) {
            this.texture = IDLE_TEXTURE
            this.rotation = Math.sin(this.time / 100) * (Math.PI / 8)
        } else {
            this.texture = HAPPY_TEXTURE
        }

        if(this.velocity.y < 0) {
            this.scale.x = 1 - SQUEEZE
            this.scale.y = 1 + SQUEEZE
        } else {
            this.scale.x = 1
            this.scale.y = 1
        }
    }
    woohoo() {
        console.log("woohoo")
    }
}
