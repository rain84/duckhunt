import { Direction, Sound } from './types'

interface Map<T> {
	[prop: string]: T
}

export interface IOverlappable {
	onOverlap: (object: any) => ArcadePhysicsCallback
}

export interface IAnimated {
	setAnimation(direction: Direction): void
}

export interface ISound extends Map<Sound> {}
export interface IKeyboard extends Map<Phaser.Input.Keyboard.Key> {}
