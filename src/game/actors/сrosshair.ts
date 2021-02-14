import Phaser from 'phaser'
import { BaseActor } from 'game/base-classes'
import { SpriteWithDynamicBody, Direction, CursorKeys } from 'game/types'

export class Crosshair extends BaseActor {
	width = 32
	height = 32

	instance: SpriteWithDynamicBody

	#cursors: CursorKeys

	constructor(private scene: Phaser.Scene) {
		super()
		this.movement.speed = 200
	}

	preload() {
		this.scene.load.image('crosschair', 'game-assets/gun-pointer.png')
	}

	create() {
		const { scene } = this
		this.instance = scene.physics.add
			.sprite(BaseActor.scene.center.x, BaseActor.scene.center.y, 'crosschair')
			.setDepth(200)
		this.instance.setTint(0xff0000)
		this.#cursors = scene.input.keyboard.createCursorKeys()
	}

	update() {
		if (!this.instance || !this.#cursors) return

		const movement = this.movement
		const isOutOfBorder = this.isOutOfBorder()

		if (!isOutOfBorder?.left && this.#cursors.left.isDown) this.setMovement(Direction.LEFT)
		else if (!isOutOfBorder?.right && this.#cursors.right.isDown) this.setMovement(Direction.RIGHT)
		else if (!isOutOfBorder?.top && this.#cursors.up.isDown) this.setMovement(Direction.UP)
		else if (!isOutOfBorder?.bottom && this.#cursors.down.isDown) this.setMovement(Direction.DOWN)
		else if (movement.direction !== Direction.NONE) this.stopMovement()

		if (movement.direction === Direction.NONE) return

		this.instance.setVelocity(movement.velocity.x, movement.velocity.y)
	}
}
