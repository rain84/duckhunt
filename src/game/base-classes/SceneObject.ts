import config from '../../config.json'
import { Sprite } from 'game/types'
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

	public get instance() {
		return this._instance
	}
}
