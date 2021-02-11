import { useState, useEffect } from 'react'
import { IonPhaser } from '@ion-phaser/react'
import { Scene } from 'game'

export const Game = () => {
	const [config, updateConfig] = useState({
		type: Phaser.AUTO,
		backgroundColor: '#125555',
		width: 800,
		height: 600,
		scene: Scene,
	})

	return <IonPhaser game={config} initialize={true} />
}
