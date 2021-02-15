import Phaser from 'phaser'
import { StaticObject } from 'game/base-classes'
import { Text as TText, ZIndex } from 'game/types'

export class Text extends StaticObject {
	constructor(private str: string, private x: number, private y: number, private scene: Phaser.Scene) {
		super()
	}

	private text: TText

	create() {
		this.text = this.scene.add
			.text(this.x, this.y, this.str, { fontSize: '24px', color: '#fff' })
			.setDepth(ZIndex.LABELS)
	}

	setText(str: string) {
		this.text?.setText(str)
	}

	show() {
		this.text?.setVisible(true)
	}

	hide() {
		this.text?.setVisible(false)
	}
}
