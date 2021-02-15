export type SpriteWithDynamicBody = Maybe<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
export type CursorKeys = Maybe<Phaser.Types.Input.Keyboard.CursorKeys>
export type Sprite = Maybe<
	Phaser.GameObjects.Sprite & Phaser.Physics.Arcade.Sprite & Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
>
export type StaticGroup = Maybe<Phaser.Physics.Arcade.StaticGroup>
export type Group = Maybe<Phaser.Physics.Arcade.Group>
export type UnknownFn = () => void

export enum Direction {
	RIGHT,
	LEFT,
	UP,
	DOWN,
	UP_RIGHT,
	UP_LEFT,
	DOWN_RIGHT,
	DOWN_LEFT,
	NONE,
}

export enum DuckAnimation {
	RIGHT = 'RIGHT',
	UP = 'UP',
	UP_RIGHT = 'UP_RIGHT',
	KILLED = 'KILLED',
}
