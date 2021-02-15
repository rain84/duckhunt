import Phaser from 'phaser'
import { BaseActor } from 'game/base-classes'
import { IAnimated } from 'game/interfaces'
import { Direction, DuckAnimation } from 'game/types'

export class Duck extends BaseActor implements IAnimated {
	protected width = 40
	protected height = 37
	private animation = DuckAnimation.RIGHT
	protected soundList = ['dead_duck_falls']

	constructor(private scene: Phaser.Scene) {
		super()
		this.movement.speed = 100
	}

	preload() {
		this.scene.load.spritesheet('duck', 'game-assets/duck.sprite120x148.png', {
			frameWidth: this.width,
			frameHeight: this.height,
		})
		this.preloadSound(this.soundList, this.scene)
	}

	create() {
		const { scene } = this
		this._instance = scene.physics.add.sprite(BaseActor.scene.center.x - this.width * 2, BaseActor.scene.center.y, '')
		this._instance.setScale(1.5).setCollideWorldBounds(true)
		this.sounds = this.createSound(this.soundList, this.scene)

		const animations = [
			{
				key: DuckAnimation.RIGHT,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [0, 1, 2] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: DuckAnimation.UP_RIGHT,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [3, 4, 5] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: DuckAnimation.UP,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [6, 7, 8] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: DuckAnimation.KILLED,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [9, 10] }),
				frameRate: 4,
				repeat: -1,
			},
		]
		animations.forEach((config) => scene.anims.create(config))
		this.prepareMove(Direction.RIGHT)
	}

	update() {
		if (!this._instance) return

		this.checkOnBounds()
		this._instance.setVelocity(this.movement.velocity.x, this.movement.velocity.y).play(this.animation, true)
	}

	onOverlap() {}

	kill() {
		// this.sounds.dead_duck_falls.play()
		this.prepareMove(Direction.DOWN, () => {})
	}

	setAnimation(direction: Direction) {
		if (!this._instance) return

		switch (direction) {
			case Direction.RIGHT:
				this.animation = DuckAnimation.RIGHT
				this._instance.setAngle(0)
				this._instance.setFlip(false, false)
				break

			case Direction.LEFT:
				this.animation = DuckAnimation.RIGHT
				this._instance.setAngle(0)
				this._instance.setFlip(true, false)
				break

			case Direction.UP:
				this.animation = DuckAnimation.UP
				this._instance.setAngle(0)
				this._instance.setFlip(false, false)
				break

			case Direction.DOWN:
				this.animation = DuckAnimation.KILLED
				this._instance.setAngle(0)
				this._instance.setFlip(false, false)
				break

			case Direction.UP_RIGHT:
				this.animation = DuckAnimation.UP_RIGHT
				this._instance.setAngle(0)
				this._instance.setFlip(false, false)
				break

			case Direction.UP_LEFT:
				this.animation = DuckAnimation.UP_RIGHT
				this._instance.setAngle(0)
				this._instance.setFlip(true, false)
				break

			case Direction.DOWN_RIGHT:
				this.animation = DuckAnimation.UP_RIGHT
				this._instance.setAngle(90)
				this._instance.setFlip(false, false)
				break

			case Direction.DOWN_LEFT:
				this.animation = DuckAnimation.UP_RIGHT
				this._instance.setAngle(90)
				this._instance.setFlip(false, true)
				break

			case Direction.NONE:
				this.animation = DuckAnimation.RIGHT
				this._instance.setAngle(0)
				this._instance.setFlip(false, false)
				break

			default:
				throw new Error(`Wrong direction '${direction}'`)
		}
		this.movement.direction = direction
	}

	private checkOnBounds() {
		const isOutOfBorder = this.isOutOfBorder()

		if (isOutOfBorder?.right) this.prepareMove(Direction.UP)
		if (isOutOfBorder?.top) this.prepareMove(Direction.DOWN_LEFT)
		if (isOutOfBorder?.left) this.prepareMove(Direction.DOWN_RIGHT)
		if (isOutOfBorder?.bottom) this.prepareMove(Direction.UP)
	}
}
