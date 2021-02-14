import Phaser from 'phaser'
import config from '../../config.json'

type Sprite = Maybe<Phaser.GameObjects.Sprite & Phaser.Physics.Arcade.Sprite>

export abstract class SceneObject {
	static scene = {
		width: config.width,
		height: config.height,
		center: {
			x: config.width / 2,
			y: config.height / 2,
		},
	}

	width = 0
	height = 0

	protected instance: Sprite

	abstract preload(): void
	abstract create(): void

	update() {}
}
