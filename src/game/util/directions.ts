import { Direction } from 'game/types'

enum ESide {
	OPPOSITE = 'OPPOSITE',
	FOLLOWING = 'FOLLOWING',
}

const directions = {
	[ESide.OPPOSITE]: {
		[Direction.UP]: [Direction.DOWN_LEFT, Direction.DOWN_RIGHT],
		[Direction.DOWN]: [Direction.UP_LEFT, Direction.UP, Direction.UP_RIGHT],
		[Direction.LEFT]: [Direction.DOWN_RIGHT, Direction.RIGHT, Direction.UP_RIGHT],
		[Direction.RIGHT]: [Direction.DOWN_LEFT, Direction.LEFT, Direction.DOWN_RIGHT],
	},
	[ESide.FOLLOWING]: {
		[Direction.UP]: [Direction.UP_LEFT, Direction.UP_RIGHT],
		[Direction.DOWN]: [Direction.DOWN_LEFT, Direction.DOWN_RIGHT],
		[Direction.LEFT]: [Direction.DOWN_LEFT, Direction.UP_LEFT],
		[Direction.RIGHT]: [Direction.DOWN_RIGHT, Direction.UP_RIGHT],

		[Direction.UP_LEFT]: [Direction.LEFT, Direction.UP],
		[Direction.UP_RIGHT]: [Direction.UP, Direction.RIGHT],
		[Direction.DOWN_LEFT]: [Direction.LEFT],
		[Direction.DOWN_RIGHT]: [Direction.RIGHT],
	},
}

type TOpposite = Direction.UP | Direction.DOWN | Direction.LEFT | Direction.RIGHT
type TFollowing =
	| Direction.UP
	| Direction.LEFT
	| Direction.RIGHT
	| Direction.UP_LEFT
	| Direction.UP_RIGHT
	| Direction.DOWN_LEFT
	| Direction.DOWN_RIGHT

const getRandom = (arr: Direction[]) => arr[Phaser.Math.Between(0, arr.length - 1)]

export const getRandomDirection = {
	opposite: (dir: TOpposite): Direction => {
		const section = directions[ESide.OPPOSITE][dir]
		return getRandom(section)
	},
	following: (dir: Direction): Direction | null => {
		const section = directions[ESide.FOLLOWING][dir as TFollowing]
		return Array.isArray(section) ? getRandom(section) : null
	},
}
