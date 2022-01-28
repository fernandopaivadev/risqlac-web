import React from 'react'
import { withRouter } from 'react-router-dom'

import { ButtonsComponent } from '../../../@types'
import Header from '../../blocks/Header/Header'
import styles from './Buttons.styles'
import logo from '../../../assets/logo.png'

const Buttons: React.FC<ButtonsComponent> = ({ buttons, header }) =>
  <styles.main>
    <Header
      {...header}
    />
    <styles.logo
      data-testid='logo'
    >
      <img
        src={logo}
        alt='Tech Amazon Logo'
      />
      <styles.title>Uirapuru</styles.title>
    </styles.logo>

    <styles.buttons>
      {buttons.map((button, index) =>
        <button
          key={index}
          style={{
            backgroundColor: button.color,
            color: button.fontColor ?? 'var(--black)'
          }}
          onClick={button.onClick}
        >
          {button.name}
        </button>
      )}
    </styles.buttons>
  </styles.main>

export default withRouter(Buttons)