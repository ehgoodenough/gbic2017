import * as Pixi from "pixi.js"

var TEXTURE = undefined

export default class Kitty extends Pixi.Sprite {
    constructor() {
        TEXTURE = TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        super(TEXTURE)

        this.tint = 0xDE771A

        this.anchor.x = 0.5
        this.anchor.y = 0.75

        this.position.x = 426 / 5
        this.position.y = 20

        this.stack = 0

        this.time = 0
    }
    update(delta) {
        this.position.x += 1

        this.time += delta.ms
        this.rotation = Math.sin(this.time / 100) * (Math.PI / 8)
        this.anchor.x = 0.5 + (Math.cos(this.time / 100) * 0.25)
    }
}
