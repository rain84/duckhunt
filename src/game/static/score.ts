import Phaser from 'phaser'
import { StaticObject } from 'game/base-classes'
import { Text } from './text'

export class Score extends StaticObject {
	private text: Text
	private caption = 'Score:'
	private counter = 0

	constructor(x: number, y: number, scene: Phaser.Scene) {
		super()
		this.text = new Text('', x, y, scene)
	}

	preload() {
		this.text.preload()
	}

	increase = (value = 1) => {
		this.counter += value
		this.updateText()
	}

	decrease = (value = 1) => {
		this.counter -= value
		this.updateText()
	}

	create() {
		this.text.create()
		this.updateText()
	}

	valueOf() {
		return this.counter
	}

	private updateText() {
		this.text.setText(`${this.caption}${this.counter}`)
	}
}
