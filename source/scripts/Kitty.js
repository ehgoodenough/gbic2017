import * as Pixi from "pixi.js"

var TEXTURE = undefined

export default class Kitty extends Pixi.Sprite {
    constructor() {
        TEXTURE = TEXTURE || Pixi.Texture.from(require("images/kitty.png"))
        super(TEXTURE)

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.tint = 0xDE771A
    }
}
