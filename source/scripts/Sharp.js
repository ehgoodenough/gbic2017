import * as Pixi from "pixi.js"

var TEXTURE = undefined
import {FRAME} from "scripts/Constants.js"

export default class Sharp extends Pixi.Sprite {
    constructor() {
        TEXTURE = TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        super(TEXTURE)

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.tint = 0x000000
        this.scale.x = -1
        this.stack = -1
    }

    update(delta) {
        if(this.position.x + this.width < -1 * this.parent.position.x) {
            this.position.x += FRAME.WIDTH * 1.5
        }

        // console.log(getDistance(this.position, this.parent.player.position))
        if(getDistance(this.position, this.parent.player.position) < 32) {
            throw -1
        }
    }
}

function getDistance(a, b) {
    var x = a.x - b.x
    var y = a.y - b.y

    return Math.sqrt(x*x + y*y)
}
