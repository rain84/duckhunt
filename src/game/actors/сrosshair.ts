import Phaser from 'phaser'
import { BaseActor } from 'game/base-classes'
import { Ammo } from 'game/static'
import { Duck } from 'game/actors'
import { IOverlappable, IKeyboard } from 'game/interfaces'
import { Direction, CursorKeys, ZIndex } from 'game/types'

export class Crosshair extends BaseActor implements IOverlappable {
	protected width = 32
	protected height = 32
	private cursors: CursorKeys
	private keyboard: IKeyboard = {}

	constructor(private ammo: Ammo, private scene: Phaser.Scene) {
		super()
		this.movement.speed = 200
	}

	preload() {
		this.scene.load.image('crosschair', 'game-assets/gun-pointer.png')
	}

	create() {
		const { scene } = this
		this._instance = scene.physics.add
			.sprite(BaseActor.scene.center.x, BaseActor.scene.center.y, 'crosschair')
			.setDepth(ZIndex.CROSSHAIR)

		this.cursors = scene.input.keyboard.createCursorKeys()
		this.keyboard.R = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
	}

	update() {
		if (!this._instance || !this.cursors) return

		const movement = this.movement
		const isOutOfBorder = this.isOutOfBorder()

		if (this?.cursors?.space.isDown) this.ammo.tryToShoot()
		if (this.keyboard.R.isDown) this.ammo.reload()

		if (!isOutOfBorder?.left && this.cursors.left.isDown) this.setMovement(Direction.LEFT)
		else if (!isOutOfBorder?.right && this.cursors.right.isDown) this.setMovement(Direction.RIGHT)
		else if (!isOutOfBorder?.top && this.cursors.up.isDown) this.setMovement(Direction.UP)
		else if (!isOutOfBorder?.bottom && this.cursors.down.isDown) this.setMovement(Direction.DOWN)
		else if (movement.direction !== Direction.NONE) this.stopMovement()

		if (movement.direction === Direction.NONE) return

		this._instance.setVelocity(movement.velocity.x, movement.velocity.y)
	}

	onOverlap = (duck: Duck): ArcadePhysicsCallback => () => {
		if (this?.cursors?.space.isDown && this.ammo.isShooting) {
			duck.kill()
		}
	}
}
