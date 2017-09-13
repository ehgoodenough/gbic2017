import * as Pixi from "pixi.js"

var WHITE_TEXTURE = undefined
var BLACK_TEXTURE = undefined

var GAP = 2
var WHITE_WIDTH = 33
var BLACK_HEIGHT = 50
var TILE = WHITE_WIDTH + GAP

var STAGE = {
    TILES: ".12345.abABC..",
    BPM: 1
}

import {COLORS} from "scripts/Constants.js"

class PianoKey extends Pixi.Sprite {
    constructor(texture, index) {
        super(texture)

        this.index = index
        this.position.x = this.index * TILE

        this.anchor.x = 0.5
        this.anchor.y = 0.5
    }
    update(delta) {
        if(this.position.x < -1 * this.parent.position.x - WHITE_WIDTH) {
            this.position.x += TILE * 14
        }
    }
}

export class BlackPianoKey extends PianoKey {
    constructor(index) {
        BLACK_TEXTURE = BLACK_TEXTURE || Pixi.Texture.from(require("images/black-key.png"))
        super(BLACK_TEXTURE, index)

        this.stack = -10

        this.position.x += WHITE_WIDTH / 2 + 1
        this.position.y = -1 * ((BLACK_HEIGHT / 2) - 2)
    }
}

export class WhitePianoKey extends PianoKey {
    constructor(index) {
        WHITE_TEXTURE = WHITE_TEXTURE || Pixi.Texture.from(require("images/white-key.png"))
        super(WHITE_TEXTURE, index)

        this.stack = -11

        this.tile = STAGE.TILES[this.index]

        this.isHighlighted = /[12345]/.test(this.tile)
        this.isAccidental = /[ab ABC]/.test(this.tile)

        this.tint = COLORS[this.tile] || 0xFFFFFF
    }
    update(delta) {
        super.update(delta)

        if(this.isOn()) {
            if(this.parent.player.bam > 0) {
                this.position.y = 12

                if(this.wasStruck != true) {
                    this.wasStruck = true

                    if(this.isHighlighted) {
                        this.isHighlighted = false
                        this.tint = 0xFFFFFF

                        this.parent.player.woohoo()
                    }
                }
            } else {
                this.position.y = 4
            }
        } else {
            this.position.y = 0
        }
    }
    isOn() {
        return this.parent.player.position.y == 0
            && Math.abs(this.position.x - this.parent.player.position.x) < WHITE_WIDTH * (3/4)
    }
}
