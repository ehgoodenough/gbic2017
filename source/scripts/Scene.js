import * as Pixi from "pixi.js"

import Player from "scripts/Player.js"
import {WhitePianoKey} from "scripts/PianoKey.js"
import {BlackPianoKey} from "scripts/PianoKey.js"

import {FRAME} from "scripts/Constants.js"
import Accidental from "scripts/Accidental.js"
const PIANO_LENGTH = 14

var STAGE = {
    TILES: ".12345.abABC..",
    GLYPHS: ".........a....12345........",
    BPM: 1
}
// this.accidental = new Accidental({
//     index: this.index,
//     glyph: this.glyph
// })

export default class Scene extends Pixi.Container {
    constructor() {
        super()

        this.position.x = 0
        this.position.y = FRAME.HEIGHT * 0.666

        this.addChild(new Player())

        for(var i = 0; i < PIANO_LENGTH; i += 1) {
            this.extendStage(i)
        }
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })

        this.position.x = -1 * (this.player.position.x - (FRAME.WIDTH / 4))
    }
    extendStage(index) {
        var glyph = STAGE.GLYPHS[index] || "."

        this.addChild(new WhitePianoKey(index, glyph))

        if(Accidental.shouldSpawn(index, glyph)) {
            this.addChild(new Accidental(index, glyph))
        }

        if(BlackPianoKey.shouldSpawn(index, glyph)) {
            this.addChild(new BlackPianoKey(index))
        }
    }
    addChild(child) {
        super.addChild(child)

        if(child instanceof Player) {
            this.player = child
        }

        if(child.accidental) {
            this.addChild(child.accidental)
        }

        this.children.sort((a, b) => {
            if((a.stack || 0) < (b.stack || 0)) return -1
            if((a.stack || 0) > (b.stack || 0)) return +1
            return 0
        })
    }
}
