declare namespace Phaser {
	namespace GameObjects {
		interface GameObject {
			setBounceY(value: number): void
		}
	}
}

declare type GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody & {
	disableBody: (arg1: boolean, arg2: boolean) => void
}

declare type Maybe<T> = T | null | undefined
