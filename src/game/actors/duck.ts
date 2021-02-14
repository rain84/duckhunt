import Phaser from 'phaser'
import { SceneObject } from 'game/SceneObject'

type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
// type Sprite = Maybe<Phaser.GameObjects.Sprite>
// type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
// type Group = Maybe<Phaser.Physics.Arcade.Group>
// type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

enum Direction {
	FORWARD,
	BACKWARD,
	TOP,
	TOP_RIGHT,
	TOP_LEFT,
	DOWN,
}

enum Animation {
	FORWARD = 'FORWARD',
	DIAGONAL = 'DIAGONAL',
	TOP = 'TOP',
	DOWN = 'DOWN',
}

export class Duck extends SceneObject {
	static width = 40
	static height = 37

	#duck: SpriteWithDynamicBody
	#flight = {
		speed: 100,
		velocity: { x: 0, y: 0 },
		direction: Direction.FORWARD,
		animation: Animation.FORWARD,
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
		this.#duck = scene.physics.add.sprite(SceneObject.width, SceneObject.center.y, '')
		this.#duck.setScale(1.5).setBounce(0.4).setCollideWorldBounds(true)
		this.setDirection(Direction.BACKWARD)

		const animations = [
			{
				key: Animation.FORWARD,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [0, 1, 2] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.DIAGONAL,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [3, 4, 5] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.TOP,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [6, 7, 8] }),
				frameRate: 8,
				repeat: -1,
			},
			{
				key: Animation.DOWN,
				frames: scene.anims.generateFrameNumbers('duck', { frames: [9, 10] }),
				frameRate: 4,
				repeat: -1,
			},
		]
		animations.forEach((config) => scene.anims.create(config))
	}

	setDirection(direction: Direction) {
		if (!this.#duck) return

		switch (direction) {
			case Direction.FORWARD:
				this.#flight.velocity.x = this.#flight.speed
				this.#flight.velocity.y = 0
				this.#flight.animation = Animation.FORWARD
				this.#duck.setFlip(false, false)
				break

			case Direction.BACKWARD:
				this.#flight.velocity.x = -this.#flight.speed
				this.#flight.velocity.y = 0
				this.#flight.animation = Animation.FORWARD
				this.#duck.setFlip(true, false)
				break

			case Direction.TOP:
				this.#flight.velocity.x = 0
				this.#flight.velocity.y = -this.#flight.speed
				this.#flight.animation = Animation.TOP
				this.#duck.setFlip(false, false)
				break

			case Direction.TOP_LEFT:
				this.#flight.velocity.x = -this.#flight.speed
				this.#flight.velocity.y = -this.#flight.speed
				this.#flight.animation = Animation.DIAGONAL
				this.#duck.setFlip(true, false)
				break

			case Direction.TOP_RIGHT:
				this.#flight.velocity.x = this.#flight.speed
				this.#flight.velocity.y = -this.#flight.speed
				this.#flight.animation = Animation.DIAGONAL
				this.#duck.setFlip(false, false)
				break

			case Direction.DOWN:
				this.#flight.velocity.x = 0
				this.#flight.velocity.y = this.#flight.speed
				this.#flight.animation = Animation.DOWN
				this.#duck.setFlip(false, false)
				break

			default:
				throw new Error('Wrong direction')
		}
		this.#flight.direction = direction
	}

	checkOnBounds() {
		if (!this.#duck) return

		const isOutOfBorder = {
			right: SceneObject.width - this.#duck.x - Duck.width < 0,
			left: this.#duck.x - Duck.width < 0,
			top: this.#duck.y - Duck.height < 0,
			bottom: SceneObject.height - this.#duck.y - Duck.height < 0,
		}

		if (isOutOfBorder.right) this.setDirection(Direction.TOP_LEFT)
		if (isOutOfBorder.top) this.setDirection(Direction.DOWN)
		if (isOutOfBorder.left) this.setDirection(Direction.FORWARD)
		if (isOutOfBorder.bottom) this.setDirection(Direction.TOP_LEFT)
	}

	update() {
		if (!this.#duck) return

		this.checkOnBounds()

		const flight = this.#flight
		this.#duck.setVelocity(flight.velocity.x, flight.velocity.y).play(flight.animation, true)
	}
}
