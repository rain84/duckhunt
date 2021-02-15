import Phaser from 'phaser'
import { Duck, Crosshair } from 'game/actors'
import { Background } from 'game/static'
import { BaseActor, StaticObject } from 'game/base-classes'
import { Sprite } from 'game/types'

// type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
// type Group = Maybe<Phaser.Physics.Arcade.Group>
// type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>
export class Level extends Phaser.Scene {
	#isGameOver = false
	#bg: StaticObject
	#actors: BaseActor[]
	#duck: Duck
	#crosshair: Crosshair

	constructor() {
		super('Level')
		this.#bg = new Background('game-assets/duck-hunt-background.png', this)
		this.#duck = new Duck(this)
		this.#crosshair = new Crosshair(this)
		this.#actors = [this.#duck, this.#crosshair]
	}

	preload() {
		this.#bg.preload()
		this.#actors.forEach((actor) => actor.preload())
	}

	create() {
		this.#bg.create()
		this.#actors.forEach((actor) => actor.create())
		this.physics.add.overlap(
			this.#duck.instance as NonNullable<Sprite>,
			this.#crosshair.instance as NonNullable<Sprite>,
			this.#crosshair.onOverlap(this.#duck),
			undefined,
			this
		)
	}

	update() {
		if (this.#isGameOver) return

		this.#isGameOver = this.#actors.some((actor) => actor.update())
	}
}
