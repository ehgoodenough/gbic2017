import * as Pixi from "pixi.js"

var WHITE_TEXTURE = undefined
var BLACK_TEXTURE = undefined

var GAP = 2
var WHITE_WIDTH = 33
var BLACK_HEIGHT = 50

import {COLORS} from "scripts/Constants.js"

export default class PianoKey extends Pixi.Sprite {
    constructor(index, type) {
        WHITE_TEXTURE = WHITE_TEXTURE || Pixi.Texture.from(require("images/white-key.png"))
        BLACK_TEXTURE = BLACK_TEXTURE || Pixi.Texture.from(require("images/black-key.png"))
        super(type == "black" ? BLACK_TEXTURE : WHITE_TEXTURE)

        this.type = type || "white"
        this.index = index || 0

        this.position.x = this.index * (WHITE_WIDTH + GAP)
        this.position.x += (this.type == "black" ? WHITE_WIDTH / 2 + 1 : 0)
        this.position.y = (this.type == "black" ? -1 * ((BLACK_HEIGHT / 2) - 2) : 0)

        this.stack = (this.type == "black" ? -10.1 : -10.2)

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.rerandomize()
    }
    rerandomize() {
        if(this.type == "white") {
            this.isSpecial = Math.random() < 0.1
            this.tint = this.isSpecial ? COLORS.ORANGE : 0xFFFFFF
            this.isStruck = false
        }
    }
    update(delta) {
        if(this.position.x < -1 * this.parent.position.x - WHITE_WIDTH) {
            this.position.x += (WHITE_WIDTH + GAP) * 14 // fourteen is the amount of white keys

            this.rerandomize()
        }

        if(this.type == "white") {
            if(this.parent.player !== undefined) {
                if(this.parent.player.position.y == 0
                && Math.abs(this.position.x - this.parent.player.position.x) < WHITE_WIDTH * 0.75) {
                    if(this.parent.player.bam > 0) {
                        this.position.y = 12

                        if(this.isStruck != true) {
                            this.isStruck = true
                            this.tint = 0xFFFFFF

                            if(this.isSpecial) {
                                console.log("DING")
                            }
                        }
                    } else {
                        this.position.y = 4
                    }
                } else {
                    this.position.y = 0
                }
            }
        }
    }
}
