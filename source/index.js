import * as Pixi from "pixi.js"
import Statgrab from "statgrab/do"
import Yaafloop from "yaafloop"

Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST

import Game from "scripts/Game.js"
var game = new Game()

document.getElementById("frame").appendChild(game.renderer.view)

var loop = new Yaafloop(function(delta) {
    game.update(delta)
    game.render()
})
