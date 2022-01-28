import React from 'react'
import { withRouter } from 'react-router-dom'
import { BsArrowLeftShort as BackIcon } from 'react-icons/bs'

import { HeaderComponent } from '../../../@types'
import styles from './Header.style'

const Header: React.FC<HeaderComponent> = ({
  color,
  fontColor,
  backButton,
  title
}) => <styles.header
  style={{
    backgroundColor: color,
    color: fontColor ?? 'var(--white)'
  }}
>
  <BackIcon
    className='backIcon'
    onClick={backButton}
  />
  <p>{title}</p>
</styles.header >

export default withRouter(Header)