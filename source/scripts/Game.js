import * as Pixi from "pixi.js"

import Star from "scripts/Star.js"
import Scene from "scripts/Scene.js"
import Planet from "scripts/Planet.js"

import {FRAME} from "scripts/Constants.js"
const STAR_COUNT = 100
const SCALE = 2

const MESSAGE = document.getElementById("message")

export default class Game extends Pixi.Container {
    constructor() {
        super()

        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH * SCALE,
            height: FRAME.HEIGHT * SCALE,
            transparent: true
        })

        this.addChild(this.title = new Pixi.Sprite(Pixi.Texture.from(require("images/title.png"))))
        this.title.alpha = 0

        this.scale.x = SCALE
        this.scale.y = SCALE
    }
    update(delta) {
        if(this.title != undefined) {
            this.title.alpha += delta.s
            if(window.hasHitAnyKey) {
                this.removeChild(this.title)
                delete this.title
                this.addChild(this.scene = new MegaScene())
            }
        }

        if(this.scene != undefined) {
            this.scene.update(delta)
        }
    }
    render() {
        this.renderer.render(this)
    }
}

class MegaScene extends Pixi.Container {
    constructor() {
        super()

        for(var i = 0; i < STAR_COUNT; i += 1) {
            this.addChild(new Star())
        }

        this.addChild(new Planet())
        this.addChild(new Scene())

        window.music.currentTime = 0
        window.music.playbackRate = 1
        window.music.volume = 0.5
        window.music.play()
    }
    update(delta) {
        if(this.kill > 0) {
            this.kill += delta.s

            if(this.kill > 3) {
                MESSAGE.innerHTML = "GAME OVER"
                MESSAGE.innerHTML += "<small>Hit spacebar to restart</small>"
            }

            if(window.hasHitAnyKey) {
                this.restart()
            }
            return
        }

        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    restart() {
        this.parent.scene = new MegaScene()
        this.parent.addChild(this.parent.scene)
        this.parent.removeChild(this)
    }
}
