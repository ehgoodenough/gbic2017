import * as Pixi from "pixi.js"

import Kitty from "scripts/Kitty.js"

export default class Game extends Pixi.Container {
    constructor() {
        super()

        window.game = this

        this.renderer = Pixi.autoDetectRenderer({
            width: 426, height: 240,
            transparent: true
        })

        this.position.x = this.renderer.width / 2
        this.position.y = this.renderer.height / 2

        this.addChild(new Kitty())
    }
    update(delta) {
        // console.log(delta)
    }
    render()  {
        this.renderer.render(this)
    }
}
