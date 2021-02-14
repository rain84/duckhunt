import Phaser from 'phaser'
import { SceneObject } from 'game/SceneObject'

type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
type Sprite = Maybe<Phaser.GameObjects.Sprite>
// type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
// type Group = Maybe<Phaser.Physics.Arcade.Group>
// type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

enum Direction {
	FORWARD,
	BACKWARD,
	UP_RIGHT,
	UP_LEFT,
	DOWN,
}

enum Animation {
	FORWARD = 'FORWARD',
	DIAGONAL = 'DIAGONAL',
	TOP = 'TOP',
	DOWN = 'DOWN',
}

export class Duck extends SceneObject {
	constructor(private scene: Phaser.Scene) {
		super()
	}

	#duck: SpriteWithDynamicBody
	#flight = {
		isFlippedX: false,
		velocity: { x: 160, y: 0 },
		animation: Animation.FORWARD,
	}

	preload() {
		this.scene.load.spritesheet('duck', 'game-assets/duck.sprite120x148.png', { frameWidth: 40, frameHeight: 37 })
	}

	create() {
		const { scene } = this
		this.#duck = scene.physics.add.sprite(0, SceneObject.center.y, '')
		this.#duck.setScale(1.5).setBounce(0.4).setCollideWorldBounds(true)

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
				frameRate: 8,
				repeat: -1,
			},
		]
		animations.forEach((config) => scene.anims.create(config))
	}

	// onChange(direction: Direction) {
	// 	switch (direction) {
	// 		case Direction.FORWARD:
	// 			break

	// 		default:
	// 			break
	// 	}
	// }

	update() {
		if (!this.#duck) return

		const flight = this.#flight
		this.#duck.setVelocity(flight.velocity.x, flight.velocity.y).play(flight.animation, true)
	}
}
