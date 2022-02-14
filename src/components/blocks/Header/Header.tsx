import React from 'react'
import { withRouter } from 'react-router-dom'
import { BsArrowLeftShort as BackIcon } from 'react-icons/bs'
import { IoMdSettings as OptionsIcon } from 'react-icons/io'

import { HeaderComponent } from '../../../@types'
import styles from './Header.style'

const Header: React.FC<HeaderComponent> = ({
  color,
  fontColor,
  backButton,
  optionsButton,
  title
}) => <styles.header
  style={{
    backgroundColor: color,
    color: fontColor ?? 'var(--white)'
  }}
>
  {backButton ?
    <BackIcon
      className='backIcon'
      onClick={backButton}
    />
    : null
  }
  <p>{title}</p>
  {optionsButton ?
    <OptionsIcon
      className='optionsIcon'
      onClick={optionsButton}
    />
    : null
  }
</styles.header >

export default withRouter(Header)
