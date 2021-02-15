import Phaser from 'phaser'
import { Duck, Crosshair } from 'game/actors'
import { Background, Ammo } from 'game/static'
import { SceneObject, StaticObject } from 'game/base-classes'
import { Sprite } from 'game/types'

export class Level extends Phaser.Scene {
	private isGameOver = false
	private bg: StaticObject
	private actors: SceneObject[]
	private duck: Duck
	private crosshair: Crosshair
	private ammo: Ammo

	constructor() {
		super('Level')
		this.bg = new Background('game-assets/duck-hunt-background-large.png', this)
		this.duck = new Duck(this)
		this.ammo = new Ammo(2, 100, 730, this)
		this.crosshair = new Crosshair(this.ammo, this)
		this.actors = [this.duck, this.crosshair, this.ammo]
	}

	preload() {
		this.bg.preload()
		this.actors.forEach((actor) => actor.preload())
	}

	create() {
		this.bg.create()
		this.actors.forEach((actor) => actor.create())
		this.physics.add.overlap(
			this.duck.instance as NonNullable<Sprite>,
			this.crosshair.instance as NonNullable<Sprite>,
			this.crosshair.onOverlap(this.duck),
			undefined,
			this
		)
	}

	update() {
		if (this.isGameOver) return

		this.isGameOver = this.actors.some((actor) => actor.update())
	}
}
