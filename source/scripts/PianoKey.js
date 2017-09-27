import * as Pixi from "pixi.js"

var WHITE_TEXTURE = undefined
var BLACK_TEXTURE = undefined

var GAP = 2
var WHITE_WIDTH = 33
var BLACK_HEIGHT = 50
var TILE = WHITE_WIDTH + GAP

import {COLORS} from "scripts/Constants.js"

class PianoKey extends Pixi.Sprite {
    constructor(texture) {
        super(texture)

        this.anchor.x = 0.5
        this.anchor.y = 0.5
    }
    update(delta) {
        if(this.position.x + this.width < -1 * this.parent.position.x) {
            // this.position.x += TILE * 14
            this.parent.removeChild(this)
            return
        }
    }
}

export class BlackPianoKey extends PianoKey {
    constructor(index, glyph) {
        BLACK_TEXTURE = BLACK_TEXTURE || Pixi.Texture.from(require("images/black-key.png"))
        super(BLACK_TEXTURE)

        this.stack = -10

        this.position.x = (index * TILE) + WHITE_WIDTH / 2 + 1
        this.position.y = -1 * ((BLACK_HEIGHT / 2) - 2)
    }
    static shouldSpawn(index) {
        return (index % 7) % 4 != 0
    }
}

export class WhitePianoKey extends PianoKey {
    constructor(index, glyph) {
        WHITE_TEXTURE = WHITE_TEXTURE || Pixi.Texture.from(require("images/white-key.png"))
        super(WHITE_TEXTURE)

        this.stack = -11

        this.index = index
        this.glyph = glyph

        this.position.x = (index * TILE)

        this.isHighlighted = /[12345]/.test(this.glyph)
        this.isAccidental = /[abABC]/.test(this.glyph)

        this.tint = COLORS[this.glyph] || 0xFFFFFF
    }
    update(delta) {
        if(this.isOn()) {
            if(this.parent.player.bam > 0) {
                if(this.wasStruck != true) {
                    this.wasStruck = true

                    if(this.isHighlighted) {
                        this.isHighlighted = false
                        this.tint = 0xFFFFFF

                        this.parent.player.woohoo(this)
                    }
                }
            }
        }
        if(this.isSteppedOn()) {
            if(this.glyph == "_") {
                this.parent.victory = true
                window.hasHitAnyKey = false
            }
            if(this.parent.player.bam > 0) {
                this.position.y = 12
            } else {
                this.position.y = 4
            }
        } else {
            this.position.y = 0
        }

        if(this.isAccidental) {
            this.position.y = 4
        }

        super.update(delta)
    }
    isOn() {
        return Math.abs(this.position.x - this.parent.player.position.x) < WHITE_WIDTH * (3/4)
    }
    isSteppedOn() {
        return this.parent.player.position.y == 0
            && this.isOn()
    }
}
