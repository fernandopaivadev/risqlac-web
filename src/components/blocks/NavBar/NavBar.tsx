import React from 'react'
import { withRouter } from 'react-router-dom'

import { RiBarChart2Fill as BarChartIcon } from 'react-icons/ri'
import { IoMdSettings as SettingsIcon } from 'react-icons/io'
import { ImCloud as WeatherIcon } from 'react-icons/im'

import { NavBarComponent } from '../../../@types'
import styles from './NavBar.style'

const NavBar: React.FC<NavBarComponent> = ({ history, option }) => <styles.main>
  <styles.option
    style={{
      borderColor: option === 'dashboard' ?
        'var(--yellow)' : 'var(--black)',
      color: option === 'dashboard' ?
        'var(--yellow)' : 'var(--white)'
    }}
    onClick={() => {
      history.push('/dashboard')
    }}
  >
    <BarChartIcon
      className='icon'
    />
    <p>
            Painel
    </p>
  </styles.option>
  <styles.option
    style={{
      borderColor: option === 'climate' ?
        'var(--yellow)' : 'var(--black)',
      color: option === 'climate' ?
        'var(--yellow)' : 'var(--white)'
    }}
    onClick={() => {
      history.push('/climate')
    }}
  >
    <WeatherIcon
      className='icon'
    />
    <p>
            Clima
    </p>
  </styles.option>
  < styles.option
    style={{
      borderColor: option === 'settings' ?
        'var(--yellow)' : 'var(--black)',
      color: option === 'settings' ?
        'var(--yellow)' : 'var(--white)'
    }}
    onClick={() => {
      history.push('/settings')
    }}
  >
    <SettingsIcon
      className='icon'
    />
    <p>
            Configurações
    </p>
  </styles.option>
</styles.main>

export default withRouter(NavBar)