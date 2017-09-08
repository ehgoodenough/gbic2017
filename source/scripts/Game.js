import * as Pixi from "pixi.js"

import Player from "scripts/Player.js"
import PianoKey from "scripts/PianoKey.js"

export default class Game extends Pixi.Container {
    constructor() {
        super()

        window.game = this

        this.renderer = Pixi.autoDetectRenderer({
            width: 426, height: 240,
            transparent: true
        })

        this.position.x = 33 / 2
        this.position.y = this.renderer.height / 2

        this.addChild(new Player())

        for(var i = 0; i < 14; i += 1) {
            this.addChild(new PianoKey(i, "white"))

            if((i % 7) % 4 == 0) continue
            this.addChild(new PianoKey(i, "black"))
        }
    }
    update(delta) {
        this.position.x -= 1

        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    render() {
        this.children.sort((a, b) => {
            a.stack = a.stack || 0
            b.stack = b.stack || 0
            if(a.stack < b.stack) return -1
            if(a.stack > b.stack) return +1
            return 0
        })

        this.renderer.render(this)
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
    }
}
