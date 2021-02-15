import Phaser from 'phaser'
import { BaseActor } from 'game/base-classes'
import { Duck } from 'game/actors'
import { IOverlappable } from 'game/interfaces'
import { Direction, CursorKeys } from 'game/types'

export class Crosshair extends BaseActor implements IOverlappable {
	private cursors: CursorKeys

	constructor(private scene: Phaser.Scene) {
		super()
		this.movement.speed = 200
		this.width = 32
		this.height = 32
	}

	preload() {
		this.scene.load.image('crosschair', 'game-assets/gun-pointer.png')
	}

	create() {
		const { scene } = this
		this._instance = scene.physics.add
			.sprite(BaseActor.scene.center.x, BaseActor.scene.center.y, 'crosschair')
			.setDepth(200)

		this.cursors = scene.input.keyboard.createCursorKeys()
	}

	update() {
		if (!this._instance || !this.cursors) return

		const movement = this.movement
		const isOutOfBorder = this.isOutOfBorder()

		if (!isOutOfBorder?.left && this.cursors.left.isDown) this.setMovement(Direction.LEFT)
		else if (!isOutOfBorder?.right && this.cursors.right.isDown) this.setMovement(Direction.RIGHT)
		else if (!isOutOfBorder?.top && this.cursors.up.isDown) this.setMovement(Direction.UP)
		else if (!isOutOfBorder?.bottom && this.cursors.down.isDown) this.setMovement(Direction.DOWN)
		else if (movement.direction !== Direction.NONE) this.stopMovement()

		if (movement.direction === Direction.NONE) return

		this._instance.setVelocity(movement.velocity.x, movement.velocity.y)
	}

	onOverlap = (duck: Duck): ArcadePhysicsCallback => () => {
		if (this?.cursors?.space.isDown) {
			duck.kill()
		}
	}
}
