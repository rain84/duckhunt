import { useState, useCallback } from 'react'
import Phaser from 'phaser'
import { GameInstance } from '@ion-phaser/react'
import phaserConfig from '../config.json'

export const useConfig = (diff: Partial<GameInstance> = {}) => {
	const [config, setConfig] = useState<GameInstance>({
		type: Phaser.AUTO,
		...phaserConfig,
		...diff,
	})

	const update = useCallback((diff: Partial<GameInstance>) => {
		setConfig((prev): GameInstance => ({ ...prev, ...diff }))
	}, [])

	return [config, update] as [GameInstance, (diff: Partial<GameInstance>) => void]
}
