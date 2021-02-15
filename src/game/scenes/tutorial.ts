import Phaser from 'phaser'
import config from 'config.json'

type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
type Group = Maybe<Phaser.Physics.Arcade.Group>
type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>

interface ITutorial {
	collectStar(object1: GameObjectWithBody, object2: GameObjectWithBody): void
	hitBomb(object1: GameObjectWithBody, object2: GameObjectWithBody): void
}

export class Tutorial extends Phaser.Scene implements ITutorial {
	#size = {
		width: config.width,
		height: config.height,
	}
	#center = { x: 0, y: 0 }

	#bombs: Group
	#platforms: StaticGroup
	#player: SpriteWithDynamicBody
	#cursors: CursorKeys
	#stars: Group
	#starsCount = 10
	#score = 0
	#scoreText: Maybe<Phaser.GameObjects.Text>
	#gameOver = false
	#gameOverText: Maybe<Phaser.GameObjects.Text>

	constructor() {
		super('Examples')
		this.#center.x = this.#size.width / 2
		this.#center.y = this.#size.height / 2
	}

	preload() {
		this.load.image('sky', 'tutorial-assets/sky.png')
		this.load.image('ground', 'tutorial-assets/platform.png')
		this.load.image('star', 'tutorial-assets/star.png')
		this.load.image('bomb', 'tutorial-assets/bomb.png')
		this.load.spritesheet('dude', 'tutorial-assets/dude.png', { frameWidth: 32, frameHeight: 48 })
	}

	create() {
		this.add.image(400, 300, 'sky')

		this.#platforms = this.createPlatforms()
		this.#player = this.createPlayer()
		this.createAnimations()

		this.physics.add.collider(this.#player, this.#platforms)
		this.#cursors = this.input.keyboard.createCursorKeys()
		this.#stars = this.createStars()
		this.#bombs = this.createBombs()

		this.createPhysics()

		this.#scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' })
		this.#gameOverText = this.add.text(16, 16, 'Game over', { fontSize: '32px', color: '#000' })
		this.#gameOverText.setVisible(false)
	}

	update() {
		if (this.#gameOver || !this.#cursors || !this.#player) return

		if (this.#cursors.left.isDown) {
			this.#player.setVelocityX(-160)
			this.#player.anims.play('left', true)
		} else if (this.#cursors.right.isDown) {
			this.#player.setVelocityX(160)
			this.#player.anims.play('right', true)
		} else {
			this.#player.setVelocityX(0)
			this.#player.anims.play('turn')
		}

		if (this.#cursors.up.isDown && this.#player.body.touching.down) {
			this.#player.setVelocityY(-330)
		}
	}

	createPhysics() {
		if (!this.#stars || !this.#platforms || !this.#player || !this.#bombs) return

		this.physics.add.collider(this.#stars, this.#platforms)
		this.physics.add.collider(this.#player, this.#platforms)
		this.physics.add.collider(this.#bombs, this.#platforms)
		this.physics.add.overlap(this.#player, this.#stars, this.collectStar as ArcadePhysicsCallback, undefined, this)
		this.physics.add.collider(this.#player, this.#bombs, this.hitBomb as ArcadePhysicsCallback, undefined, this)
	}

	hitBomb(player: GameObjectWithBody, star: GameObjectWithBody) {
		if (this.#player) {
			this.#player.setTint(0xff0000)
			this.#player.anims.play('turn')
		}

		this.gameOver()
	}

	gameOver() {
		this.physics.pause()
		this.#gameOver = true

		if (this.#gameOverText) {
			const x = this.#size.width - this.#gameOverText.width - 16
			this.#gameOverText.setVisible(true).setText('Game over').setPosition(x, 16)
		}
	}

	createBombs() {
		const bomb = this.physics.add.group({
			key: 'bomb',
			repeat: 2,
			setXY: { x: 50, y: 0, stepX: 200 },
		})

		return bomb
	}

	createStars() {
		const stars = this.physics.add.group({
			key: 'star',
			repeat: this.#starsCount,
			setXY: { x: 12, y: 0, stepX: 70 },
		})

		stars.children.iterate((child) => {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})

		return stars
	}

	collectStar(player: GameObjectWithBody, star: GameObjectWithBody) {
		if (star) star.disableBody(true, true)

		this.#score += 10
		this.#starsCount--

		if (this.#scoreText) {
			this.#scoreText.setText('Score: ' + this.#score)
		}

		if (this.#starsCount === 0) this.gameOver()
	}

	createPlatforms() {
		const platforms = this.physics.add.staticGroup()
		platforms.create(400, 568, 'ground').setScale(2).refreshBody()
		platforms.create(600, 400, 'ground')
		platforms.create(50, 250, 'ground')
		platforms.create(750, 220, 'ground')

		return platforms
	}

	createPlayer() {
		const player = this.physics.add.sprite(this.#center.x, this.#center.y, 'dude')
		player.setBounce(0.4)
		player.setCollideWorldBounds(true)

		return player
	}

	createAnimations() {
		const animations = [
			{
				key: 'left',
				frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
				frameRate: 10,
				repeat: -1,
			},
			{
				key: 'turn',
				frames: [{ key: 'dude', frame: 4 }],
				frameRate: 20,
			},
			{
				key: 'right',
				frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
				frameRate: 10,
				repeat: -1,
			},
		]

		animations.forEach((anime) => this.anims.create(anime))
	}
}
