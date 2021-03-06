import Phaser from 'phaser'
import { StaticObject } from 'game/base-classes'
import { ZIndex } from 'game/types'

export class Background extends StaticObject {
	constructor(private src: string, private scene: Phaser.Scene) {
		super()
	}

	preload() {
		this.scene.load.image('bg', this.src)
	}

	create() {
		this.scene.add.image(StaticObject.scene.center.x, StaticObject.scene.center.y, 'bg').setDepth(ZIndex.BACKGROUND)
	}
}
