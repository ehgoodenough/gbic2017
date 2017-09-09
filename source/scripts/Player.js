import * as Pixi from "pixi.js"
import Keyb from "keyb"

var IDLE_TEXTURE = undefined
var GRAVITY = 0.5

export default class Kitty extends Pixi.Sprite {
    constructor() {
        IDLE_TEXTURE = IDLE_TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        super(IDLE_TEXTURE)

        this.tint = 0xDE771A

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = 426 / 5
        this.position.y = 0

        this.velocity = {x: +2.5, y: 0}
    }
    update(delta) {
        this.time = this.time || 0
        this.time += delta.ms

        this.velocity.y += GRAVITY

        if(Keyb.isJustDown("<space>")) {
            this.velocity.y = -10
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y > 0) {
            this.position.y = 0
            this.velocity.y = 0
        }

        if(this.position.y == 0) {
            this.rotation = Math.sin(this.time / 100) * (Math.PI / 8)
            // this.anchor.x = 0.5 + (Math.cos(this.time / 100) * 0.1)
        }

        if(this.velocity.y > 0) {
            this.scale.x = 1 + 0.1
            this.scale.y = 1 - 0.1
        } else if(this.velocity.y < 0) {
            this.scale.x = 1 - 0.1
            this.scale.y = 1 + 0.1
        } else {
            this.scale.x = 1
            this.scale.y = 1
        }
    }
}
