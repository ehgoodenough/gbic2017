import * as Pixi from "pixi.js"

import {FRAME} from "scripts/Constants.js"
var TEXTURES = undefined

export default class Planet extends Pixi.Sprite {
    constructor() {
        TEXTURES = TEXTURES || [
            Pixi.Texture.from(require("images/planet-4.png")),
            Pixi.Texture.from(require("images/planet-2.png")),
            Pixi.Texture.from(require("images/planet-3.png")),
            Pixi.Texture.from(require("images/planet-1.png")),
            Pixi.Texture.from(require("images/planet-5.png")),
        ]
        super(TEXTURES[0])
        TEXTURES.push(TEXTURES.shift())

        this.position.x = FRAME.WIDTH * 1.5
        this.position.y = Math.random() * FRAME.HEIGHT * (1/4)

        this.speed = 1
    }
    update(delta) {
        this.position.x -= this.speed
        if(this.position.x <= 0 - this.width) {
            this.position.x += (2 * this.width) + FRAME.WIDTH
            this.position.y = Math.random() * FRAME.HEIGHT * (1/4 )

            this.texture = TEXTURES[0]
            TEXTURES.push(TEXTURES.shift())
        }
    }
}
