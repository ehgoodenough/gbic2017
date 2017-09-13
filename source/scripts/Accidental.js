import * as Pixi from "pixi.js"

var TEXTURES = {}

import {FRAME, TILE} from "scripts/Constants.js"

export default class Accidental extends Pixi.Sprite {
    constructor(index, glyph) {
        TEXTURES["a"] = TEXTURES["a"] || Pixi.Texture.from(require("images/single-flat.png"))
        TEXTURES["b"] = TEXTURES["b"] || Pixi.Texture.from(require("images/single-sharp.png"))
        TEXTURES["A"] = TEXTURES["A"] || Pixi.Texture.from(require("images/double-flat.png"))
        TEXTURES["B"] = TEXTURES["B"] || Pixi.Texture.from(require("images/double-sharp.png"))
        TEXTURES["C"] = TEXTURES["C"] || Pixi.Texture.from(require("images/double-sharp-up.png"))
        super(TEXTURES[glyph])

        this.index = index
        this.glyph = glyph

        this.position.x = index * TILE

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.stack = -1
    }

    update(delta) {
        if(this.position.x + this.width < -1 * this.parent.position.x) {
            this.parent.removeChild(this)
            return
        }

        // console.log(getDistance(this.position, this.parent.player.position))
        if(getDistance(this.position, this.parent.player.position) < (this.width / 2) + (this.parent.player.width / 2)) {
            throw -1
        }
    }
    static shouldSpawn(index, glyph) {
        return /[abABC]/.test(glyph)
    }
}

function getDistance(a, b) {
    var x = a.x - b.x
    var y = a.y - b.y

    return Math.sqrt(x*x + y*y)
}
