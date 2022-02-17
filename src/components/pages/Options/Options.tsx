import React from 'react'
import { RouteComponentProps } from 'react-router'

import storage from '../../../services/storage'

import Buttons from '../../blocks/Buttons/Buttons'

import styles from './Options.styles'

const Options: React.FC<RouteComponentProps> = ({ history }) => {
  const isAdmin = !(storage.read('user')?.access_level === 'admin')
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
              history.push('/products')
            }
          }
        }
        buttons={[
          {
            name: 'Alterar Senha',
            color: colorButton,
            onClick: () => {
              history.push('/change-password')
            }
          },
          {
            name: 'Alterar número de telefone',
            color: colorButton,
            onClick: () => {
              history.push('/change-phone')
            }
          },
          {
            name: 'Alterar e-mail',
            color: colorButton,
            onClick: () => {
              history.push('/change-email')
            }
          },
          {
            name: 'Lista de usuários',
            color: colorButtonAdmin,
            fontColor: 'var(--white)',
            onClick: () => {
              history.push('/users')
            }
          },
          {
            name: 'Lista de laboratórios',
            color: colorButtonAdmin,
            fontColor: 'var(--white)',
            onClick: () => {
              history.push('/labs')
            }
          },
          {
            name: 'Sobre o GHS',
            color: colorButton,
            onClick: () => {
              history.push('/login')
              storage.clear('all')
            }
          },
          {
            name: 'Créditos',
            color: colorButton,
            onClick: () => {
              history.push('/login')
              storage.clear('all')
            }
          },
          {
            name: 'Sair',
            color: colorButton,
            onClick: () => {
              history.push('/login')
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
              history.push('/products')
            }
          }
        }
        buttons={[
          {
            name: 'Alterar Senha',
            color: colorButton,
            onClick: () => {
              history.push('/change-password')
            }
          },
          {
            name: 'Alterar número de telefone',
            color: colorButton,
            onClick: () => {
              history.push('/change-phone')
            }
          },
          {
            name: 'Alterar e-mail',
            color: colorButton,
            onClick: () => {
              history.push('/change-email')
            }
          },
          {
            name: 'Lista de laboratórios',
            color: colorButtonAdmin,
            fontColor: 'var(--white)',
            onClick: () => {
              history.push('/labs')
            }
          },
          {
            name: 'Sair',
            color: colorButton,
            onClick: () => {
              history.push('/login')
              storage.clear('all')
            }
          }
        ]}
      />
    }
  </styles.main>
}

export default Options
