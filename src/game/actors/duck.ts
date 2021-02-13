import Phaser from 'phaser'
import { Level } from 'game/scenes/level'
import { Actor } from 'game/actors/interfaces'
import config from '../../config.json'

type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
type Group = Maybe<Phaser.Physics.Arcade.Group>
type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

export class Duck extends Actor {
	#size = {
		width: config.width,
		height: config.height,
	}
	#center = {
		x: config.width / 2,
		y: config.height / 2,
	}

	constructor(private scene: Phaser.Scene) {
		super()
	}

	#duck: SpriteWithDynamicBody

	preload() {
		this.scene.load.image('duck', 'game-assets/duck.png')
	}

	create() {
		this.#duck = this.scene.physics.add.sprite(0, this.#center.y, 'duck')
		this.#duck.setScale(0.5).setBounce(0.4).setCollideWorldBounds(true)
	}

	update() {
		if (!this.#duck) return

		this.#duck.setVelocityX(160)
		this.#duck.anims.play('right', true)
	}
}
