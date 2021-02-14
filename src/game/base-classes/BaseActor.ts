import { Direction, Animation } from 'game/types'
import { SceneObject } from './SceneObject'

export abstract class BaseActor extends SceneObject {
	// unfortunately I cannot implement protected 'instance',
	// because it should be inited in Phaser's create() method,
	// which will run ONLY AFTER EcmaScript-constructor
	// protected instance: Maybe<Phaser.GameObjects.Sprite>

	abstract preload(): void
	abstract create(): void

	protected animation = Animation.DEFAULT
	protected movement = {
		speed: 0,
		velocity: { x: 0, y: 0 },
		direction: Direction.NONE,
	}

	update() {}

	isOutOfBorder() {
		if (!this.instance) return null

		const right = SceneObject.scene.width - this.instance.x - this.width < 0
		const left = this.instance.x - this.width < 0
		const top = this.instance.y - this.height < 0
		const bottom = SceneObject.scene.height - this.instance.y - this.height < 0

		return right || left || top || bottom
			? {
					right,
					left,
					top,
					bottom,
			  }
			: null
	}

	stopMovement() {
		this.setMovement(Direction.NONE)
		this.instance?.setVelocity(0)
	}

	setMovement(direction: Direction) {
		switch (direction) {
			case Direction.RIGHT:
				this.movement.velocity.x = this.movement.speed
				break

			case Direction.LEFT:
				this.movement.velocity.x = -this.movement.speed
				break

			case Direction.UP:
				this.movement.velocity.y = -this.movement.speed
				break

			case Direction.DOWN:
				this.movement.velocity.y = this.movement.speed
				break

			case Direction.DOWN_LEFT:
				this.movement.velocity.x = -this.movement.speed
				this.movement.velocity.y = this.movement.speed
				break

			case Direction.DOWN_RIGHT:
				this.movement.velocity.x = this.movement.speed
				this.movement.velocity.y = this.movement.speed
				break

			case Direction.UP_LEFT:
				this.movement.velocity.x = -this.movement.speed
				this.movement.velocity.y = -this.movement.speed
				break

			case Direction.UP_RIGHT:
				this.movement.velocity.x = this.movement.speed
				this.movement.velocity.y = -this.movement.speed
				break

			case Direction.NONE:
				this.movement.velocity.x = 0
				this.movement.velocity.y = 0
				break

			default:
				throw new Error(`Wrong direction '${direction}'`)
		}
		this.movement.direction = direction
	}
}
