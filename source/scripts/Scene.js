import * as Pixi from "pixi.js"

import Player from "scripts/Player.js"
import PianoKey from "scripts/PianoKey.js"
import Sharp from "scripts/Sharp.js"

import {FRAME} from "scripts/Constants.js"
const PIANO_LENGTH = 14

export default class Scene extends Pixi.Container {
    constructor() {
        super()

        this.position.x = 0
        this.position.y = FRAME.HEIGHT * 0.666

        this.addChild(new Player())
        this.addChild(new Sharp())

        for(var i = 0; i < PIANO_LENGTH; i += 1) {
            this.addChild(new PianoKey(i, "white"))
            if((i % 7) % 4 == 0) continue
            this.addChild(new PianoKey(i, "black"))
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
    addChild(child) {
        super.addChild(child)

        if(child instanceof PianoKey) {
            this.piano = this.piano || []
            this.piano.push(child)
        }

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
