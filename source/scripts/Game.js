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

        this.addChild(new Planet())

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

var TEXTURES = undefined

class Planet extends Pixi.Sprite {
    constructor() {
        TEXTURES = TEXTURES || [
            Pixi.Texture.from(require("images/planet-1.png")),
            Pixi.Texture.from(require("images/planet-2.png")),
            Pixi.Texture.from(require("images/planet-3.png")),
            Pixi.Texture.from(require("images/planet-4.png")),
            Pixi.Texture.from(require("images/planet-5.png")),
        ]
        super(TEXTURES[0])
        TEXTURES.push(TEXTURES.shift())

        this.position.x = Math.random() * FRAME.WIDTH
        this.position.y = Math.random() * FRAME.HEIGHT * (1/4)

        this.speed = 1
    }
    update(delta) {
        this.position.x -= this.speed
        if(this.position.x <= 0 - this.width) {
            this.position.x += (2 * this.width) + FRAME.WIDTH
            this.position.y = Math.random() * FRAME.HEIGHT * (1/4 )

            this.texture = TEXTURES[0]
            TEXTURES.push(TEXTURES.shift())
        }
    }
}
