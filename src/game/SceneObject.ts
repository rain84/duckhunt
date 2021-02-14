import config from '../config.json'

export abstract class SceneObject {
	static center = {
		x: config.width / 2,
		y: config.height / 2,
	}

	abstract preload(): void
	abstract create(): void
	update() {}
}
