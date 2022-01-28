import React from 'react'
import navigate from '../../../functions/navigate'

import storage from '../../../services/storage'

import Buttons from '../../blocks/Buttons'

import styles from './styles'

const Options: React.FC = () => {
  const isAdmin = storage.read('loggedUser')?.is_admin
  const colorButton = 'var(--yellow)'
  const colorButtonAdmin = 'var(--black)'

  return <styles.main>
    {isAdmin ?
      <Buttons
        header={
          {
            title: 'Opções',
            color: 'var(--black)',
            backButton: () => {
              navigate('/products')
            }
          }
        }
        buttons={[
          {
            name: 'Alterar Senha',
            color: colorButton,
            onClick: () => {
              navigate('/change-password')
            }
          },
          {
            name: 'Lista de usuários',
            color: colorButtonAdmin,
            fontColor: 'var(--white)',
            onClick: () => {
              navigate('/users')
            }
          },
          {
            name: 'Sobre o GHS',
            color: colorButton,
            onClick: () => {
              navigate('/login')
              storage.clear('all')
            }
          },
          {
            name: 'Créditos',
            color: colorButton,
            onClick: () => {
              navigate('/login')
              storage.clear('all')
            }
          },
          {
            name: 'Sair',
            color: colorButton,
            onClick: () => {
              navigate('/login')
              storage.clear('all')
            }
          }
        ]}
      />
      :
      <Buttons
        header={
          {
            title: 'Opções',
            color: 'var(--black)',
            backButton: () => {
              navigate('/products')
            }
          }
        }
        buttons={[
          {
            name: 'Alterar Senha',
            color: colorButton,
            onClick: () => {
              navigate('/change-password')
            }
          },
          {
            name: 'Créditos',
            color: colorButton,
            onClick: () => {
              navigate('/login')
              storage.clear('all')
            }
          },
          {
            name: 'Sair',
            color: colorButton,
            onClick: () => {
              navigate('/login')
              storage.clear('all')
            }
          }
        ]}
      />
    }
  </styles.main>
}

export default Options
