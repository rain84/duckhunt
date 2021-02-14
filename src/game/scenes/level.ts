import Phaser from 'phaser'
import { Duck } from 'game/actors'
import { Background } from 'game/static'
import { SceneObject } from 'game/SceneObject'

// type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
// type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
// type Group = Maybe<Phaser.Physics.Arcade.Group>
// type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

export class Level extends Phaser.Scene {
	#isGameOver = false
	#actors: SceneObject[]
	#background: SceneObject

	constructor() {
		super('Level')
		this.#background = new Background('game-assets/duck-hunt-background.png', this)
		this.#actors = [new Duck(this)]
	}

	preload() {
		this.#background.preload()
		this.#actors.forEach((actor) => actor.preload())
	}

	create() {
		this.#background.create()
		this.#actors.forEach((actor) => actor.create())
	}

	update() {
		if (this.#isGameOver) return

		this.#isGameOver = this.#actors.some((actor) => actor.update())
	}
}
