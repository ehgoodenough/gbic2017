import * as Pixi from "pixi.js"

import Star from "scripts/Star.js"
import Scene from "scripts/Scene.js"

import {FRAME} from "scripts/Constants.js"
const STAR_COUNT = 100
const SCALE = 2

export default class Game extends Pixi.Container {
    constructor() {
        super()

        window.game = this

        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH * SCALE,
            height: FRAME.HEIGHT * SCALE,
            transparent: true
        })

        this.scale.x = SCALE
        this.scale.y = SCALE

        for(var i = 0; i < STAR_COUNT; i += 1) {
            this.addChild(new Star())
        }

        this.addChild(this.scene = new Scene())
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    render() {
        this.renderer.render(this)
    }
}
