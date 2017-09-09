import * as Pixi from "pixi.js"
import {FRAME} from "scripts/Constants.js"

var TEXTURE = undefined

export default class Star extends Pixi.Sprite {
    constructor() {
        TEXTURE = TEXTURE || Pixi.Texture.from(require("images/pixel.png"))
        super(TEXTURE)

        this.position.x = Math.random() * FRAME.WIDTH
        this.position.y = Math.random() * FRAME.HEIGHT * (2/3)

        this.width = this.height = Math.ceil(Math.random() * 2)

        this.speed = Math.random() * 0.5 + 0.25
    }
    update(delta) {
        this.position.x -= this.speed
        if(this.position.x <= -5) {
            this.position.x += 5 + FRAME.WIDTH + 5
            this.position.y = Math.random() * FRAME.HEIGHT * (2/3)
        }

        this.rotation += 0.01
    }
}
