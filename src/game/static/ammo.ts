import Phaser from 'phaser'
import { StaticObject } from 'game/base-classes'
import { Text } from './text'

export class Ammo extends StaticObject {
	private text: Text
	private caption = 'Ammo:'
	private magazine: number
	private _isShooting = false
	protected soundList = ['gun_is_empty', 'shotgun', 'gun_reload']

	constructor(private bullets: number, x: number, y: number, private scene: Phaser.Scene) {
		super()
		this.magazine = bullets
		this.text = new Text('', x, y, scene)
	}

	preload() {
		this.preloadSound(this.soundList, this.scene)
	}

	create() {
		this.text.create()
		this.updateText()
		this.sounds = this.createSound(this.soundList, this.scene)
	}

	get isEmpty() {
		return this.magazine === 0
	}

	get isFull() {
		return this.magazine === this.bullets
	}

	get isShooting() {
		return this._isShooting
	}

	tryToShoot = () => {
		if (this.isEmpty) {
			this.sounds.gun_is_empty.play()
			return false
		}

		if (this._isShooting) return false

		this.sounds.shotgun.play()
		this._isShooting = true
		this.magazine--
		this.updateText()
		setTimeout(() => (this._isShooting = false), 2000)

		return true
	}

	reload() {
		if (this.isFull) return

		this.sounds.gun_reload.play()
		this.magazine = this.bullets
		this.updateText()
	}

	private updateText() {
		this.text.setText(`${this.caption}${this.magazine}`)
	}
}
