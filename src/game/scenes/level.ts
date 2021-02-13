import Phaser from 'phaser'
import config from '../../config.json'
import { Duck } from 'game/actors'
import { Actor } from 'game/actors/interfaces'

type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
type Group = Maybe<Phaser.Physics.Arcade.Group>
type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

export class Level extends Phaser.Scene {
	#size = {
		width: config.width,
		height: config.height,
	}
	#center = {
		x: config.width / 2,
		y: config.height / 2,
	}

	#isGameOver = false
	#actors: Actor[]

	constructor() {
		super('Level')
		this.#actors = [new Duck(this)]
	}

	preload() {
		this.load.image('bg', 'game-assets/duck-hunt-background.png')
		this.#actors.forEach((actor) => actor.preload())
	}

	create() {
		this.add.image(this.#center.x, this.#center.y, 'bg')
		// this.add.image(this.#center.x, this.#center.y, 'duck').setScale(0.5)

		this.#actors.forEach((actor) => actor.create())
	}

	createEnemies() {}

	update() {
		if (this.#isGameOver) return

		this.#actors.forEach((actor) => actor.update())
	}
}
