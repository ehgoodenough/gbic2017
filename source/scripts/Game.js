import * as Pixi from "pixi.js"

import Star from "scripts/Star.js"
import Scene from "scripts/Scene.js"
import Planet from "scripts/Planet.js"

import {FRAME} from "scripts/Constants.js"
const STAR_COUNT = 100
const SCALE = 2

export default class Game extends Pixi.Container {
    constructor() {
        super()

        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH * SCALE,
            height: FRAME.HEIGHT * SCALE,
            transparent: true
        })

        this.scale.x = SCALE
        this.scale.y = SCALE

        this.addChild(this.scene = new MegaScene())
    }
    update(delta) {
        if(this.scene) {
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
    }
    update(delta) {
        if(this.kill > 0) {
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
