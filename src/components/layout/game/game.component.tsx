import { useEffect } from 'react'
import { IonPhaser, GameInstance } from '@ion-phaser/react'
import styled from 'styled-components'
import { Level, Tutorial } from 'game/scenes'
import { useConfig } from 'hooks'

const Section = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	& > .ion-phaser {
		border: 1px solid black;
	}
`

export const Game = () => {
	// const [config] = useConfig({
	// 	scene: Tutorial,
	// 	height: 600,
	// 	physics: {
	// 		arcade: {
	// 			gravity: { y: 300 },
	// 		},
	// 	},
	// })

	const [config] = useConfig({ scene: Level })

	// useEffect(() => console.log(config), [config])

	return (
		<Section>
			<IonPhaser game={config as GameInstance} className="ion-phaser" />
		</Section>
	)
}
