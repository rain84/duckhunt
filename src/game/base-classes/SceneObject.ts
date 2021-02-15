import Phaser from 'phaser'
import { Sprite } from 'game/types'
import { ISound } from 'game/interfaces'
import config from 'config.json'
export abstract class SceneObject {
	abstract preload(): void
	abstract create(): void

	static scene = {
		width: config.width,
		height: config.height,
		center: {
			x: config.width / 2,
			y: config.height / 2,
		},
	}

	protected width = 0
	protected height = 0
	protected _instance: Sprite
	protected sounds: ISound = {}
	protected soundList: string[] = []

	get instance() {
		return this._instance
	}

	update() {}

	protected preloadSound(soundList: string[], scene: Phaser.Scene) {
		soundList.forEach((sound) =>
			scene.load.audio(sound, [`game-assets/audio/${sound}.ogg`, `game-assets/audio/${sound}.mp3`])
		)
	}
	protected createSound(soundList: string[], scene: Phaser.Scene) {
		const result: ISound = {}
		soundList.forEach((sound) => (result[sound] = scene.sound.add(sound)))
		return result
	}
}
