import styles from './home.module.sass'
import styled from 'styled-components'
import duckhunt from 'assets/duckhunt.png'

const Img = styled.img`
	width: 100vh;
`

const H1 = styled.h1`
	text-align: center;
`

export const Home = () => (
	<div className={styles.home}>
		<Img src={duckhunt} alt="duckhunt" />
		<H1>Duck Hunt 2D</H1>
	</div>
)
