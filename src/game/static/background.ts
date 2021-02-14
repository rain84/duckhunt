import Phaser from 'phaser'
import { SceneObject } from 'game/SceneObject'

export class Background extends SceneObject {
	constructor(private src: string, private scene: Phaser.Scene) {
		super()
	}

	preload() {
		this.scene.load.image('bg', this.src)
	}

	create() {
		this.scene.add.image(SceneObject.center.x, SceneObject.center.y, 'bg').setDepth(100)
	}
}
