import * as Pixi from "pixi.js"
import Statgrab from "statgrab/do"
import Yaafloop from "yaafloop"

Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST

import Game from "scripts/Game.js"
window.game = new Game()

document.getElementById("frame").appendChild(game.renderer.view)

var loop = new Yaafloop(function(delta) {
    window.game.update(delta)
    window.game.render()
})

document.addEventListener("keydown", (event) => {
    window.hasHitAnyKey = true
})

document.addEventListener("mousedown", (event) => {
    window.hasHitAnyKey = true
})
