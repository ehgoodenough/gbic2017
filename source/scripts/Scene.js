import * as Pixi from "pixi.js"

import Player from "scripts/Player.js"
import {WhitePianoKey} from "scripts/PianoKey.js"
import {BlackPianoKey} from "scripts/PianoKey.js"

import {FRAME, TILE} from "scripts/Constants.js"
import Accidental from "scripts/Accidental.js"
const PIANO_LENGTH = 14

var STAGE = {}
STAGE.GLYPHS = ".............."
STAGE.GLYPHS += ".1...2...4...5"
STAGE.GLYPHS += ".....b.31"
STAGE.GLYPHS += ".....a..3.A..4.a.2"
STAGE.GLYPHS += ".....1.5.2.4..C"
STAGE.GLYPHS += "....55..33..11.."
STAGE.GLYPHS += "....bB....."
STAGE.GLYPHS += "_____"
STAGE.BPM = 1

export default class Scene extends Pixi.Container {
    constructor() {
        super()

        this.position.x = 0
        this.position.y = FRAME.HEIGHT * 0.666

        this.addChild(new Player())

        this.index = 0

        for(var i = 0; i < PIANO_LENGTH; i += 1) {
            this.extendStage()
        }
    }
    update(delta) {
        if(this.kill > 0) {
            this.kill += delta.s

            if(this.kill > 1.5) {
                this.parent.scene = new Scene()
                this.parent.addChild(this.parent.scene)
                this.parent.removeChild(this)
            }
            return
        }

        if(this.victory) {
            document.getElementById("victory").style.display = "block"
        }

        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })

        this.position.x = -1 * (this.player.position.x - (FRAME.WIDTH / 4))

        if((-1 * this.position.x) + FRAME.WIDTH > this.index * TILE) {
            this.extendStage(this.index)
        }
    }
    extendStage() {
        this.index = this.index + 1 || 0
        var glyph = STAGE.GLYPHS[this.index] || "."

        this.addChild(new WhitePianoKey(this.index, glyph))

        if(Accidental.shouldSpawn(this.index, glyph)) {
            this.addChild(new Accidental(this.index, glyph))
        }

        if(BlackPianoKey.shouldSpawn(this. index, glyph)) {
            this.addChild(new BlackPianoKey(this.index))
        }
    }
    killScene() {
        this.kill = 0.01
    }
    addChild(child) {
        super.addChild(child)

        if(child instanceof Player) {
            this.player = child
        }

        this.children.sort((a, b) => {
            if((a.stack || 0) < (b.stack || 0)) return -1
            if((a.stack || 0) > (b.stack || 0)) return +1
            return 0
        })
    }
}
