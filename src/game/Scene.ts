import Phaser from 'phaser'

export class Scene extends Phaser.Scene {
	constructor() {
		super('Scene')
	}

	preload() {
		this.load.image('logo', 'game-assets/phaser3-logo.png')
		this.load.image('libs', 'game-assets/libs.png')
		this.load.glsl('bundle', 'game-assets/plasma-bundle.glsl.js')
		this.load.glsl('stars', 'game-assets/starfields.glsl.js')
	}

	create() {
		this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0)
		this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0)
		this.add.image(400, 300, 'libs')

		const logo = this.add.image(400, 70, 'logo')

		this.tweens.add({
			targets: logo,
			y: 350,
			duration: 1500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1,
		})
	}
}
