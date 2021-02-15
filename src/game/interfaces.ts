import { Direction } from './types'

export interface IOverlappable {
	onOverlap: (object: any) => ArcadePhysicsCallback
}

export interface IAnimated {
	setAnimation(direction: Direction): void
}
