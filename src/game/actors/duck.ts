import Phaser from 'phaser'
import { BaseActor } from 'game/base-classes'
import { Direction, SpriteWithDynamicBody } from 'game/types'

export enum Animation {
	RIGHT = 'RIGHT',
	UP = 'UP',
	UP_RIGHT = 'UP_RIGHT',
	KILLED = 'KILLED',
}

export class Duck extends BaseActor {
	static width = 40
	static height = 37

	instance: SpriteWithDynamicBody
	#animation = Animation.RIGHT
	movement = {
		speed: 100,
		velocity: { x: 0, y: 0 },
		direction: Direction.RIGHT,
	}

	constructor(private scene: Phaser.Scene) {
		super()
	}

	preload() {
		this.scene.load.spritesheet('duck', 'game-assets/duck.sprite120x148.png', {
			frameWidth: Duck.width,
			frameHeight: Duck.height,
		})
	}

	create() {
		const { scene } = this
		this.instance = scene.physics.add.sprite(BaseActor.scene.center.x, BaseActor.scene.center.y, '')
		this.instance.setScale(1.5).setCollideWorldBounds(true)
		this.setMovement(Direction.DOWN_RIGHT)

		const animations = [
			{
				key: Animation.RIGHT,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [0, 1, 2] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.UP_RIGHT,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [3, 4, 5] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.UP,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [6, 7, 8] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.KILLED,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [9, 10] }),
				frameRate: 4,
				repeat: -1,
			},
		]
		animations.forEach((config) => scene.anims.create(config))
	}

	setAnimation(direction: Direction) {
		if (!this.instance) return

		switch (direction) {
			case Direction.RIGHT:
				this.#animation = Animation.RIGHT
				this.instance.setAngle(0)
				this.instance.setFlip(false, false)
				break

			case Direction.LEFT:
				this.#animation = Animation.RIGHT
				this.instance.setAngle(0)
				this.instance.setFlip(true, false)
				break

			case Direction.UP:
				this.#animation = Animation.UP
				this.instance.setAngle(0)
				this.instance.setFlip(false, false)
				break

			case Direction.DOWN:
				this.#animation = Animation.KILLED
				this.instance.setAngle(0)
				this.instance.setFlip(false, false)
				break

			case Direction.UP_RIGHT:
				this.#animation = Animation.UP_RIGHT
				this.instance.setAngle(0)
				this.instance.setFlip(false, false)
				break

			case Direction.UP_LEFT:
				this.#animation = Animation.UP_RIGHT
				this.instance.setAngle(0)
				this.instance.setFlip(true, false)
				break

			case Direction.DOWN_RIGHT:
				this.#animation = Animation.UP_RIGHT
				this.instance.setAngle(90)
				this.instance.setFlip(false, false)
				break

			case Direction.DOWN_LEFT:
				this.#animation = Animation.UP_RIGHT
				this.instance.setAngle(90)
				this.instance.setFlip(false, true)
				break

			default:
				throw new Error(`Wrong direction '${direction}'`)
		}
		this.movement.direction = direction
	}

	checkOnBounds() {
		const isOutOfBorder = this.isOutOfBorder()

		if (isOutOfBorder?.right) this.setMovement(Direction.LEFT)
		if (isOutOfBorder?.top) this.setMovement(Direction.DOWN_LEFT)
		if (isOutOfBorder?.left) this.setMovement(Direction.DOWN_RIGHT)
		if (isOutOfBorder?.bottom) this.setMovement(Direction.UP)
	}

	update() {
		if (!this.instance) return

		this.checkOnBounds()

		this.instance.setVelocity(this.movement.velocity.x, this.movement.velocity.y).play(this.#animation, true)
	}
}
