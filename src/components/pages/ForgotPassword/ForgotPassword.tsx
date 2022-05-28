import React, { useState } from 'react'

import api from '../../../services/api'
import logo from '../../../assets/logo.png'
import { SubmitEvent } from '../../../@types'

import { BsArrowLeftShort as BackIcon } from 'react-icons/bs'

import styles from './ForgotPassword.style'
import util from '../../../utils/styles'
import { RouteComponentProps } from 'react-router'
import navigate from '../../../functions/navigate'

const ForgotPassword: React.FC<RouteComponentProps> = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const submit = async (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)

    const result = await api.request({
      method: 'get',
      route: '/user/forgot-password',
      query: {
        username
      }
    })

    if (result?.status === 200) {
      setLoading(false)
      setEmailSent(true)
    } else if (result?.status === 404) {
      setErrorMessage('Usuário não encontrado')
      setLoading(false)
      setError(true)
    } else {
      setErrorMessage('Ocorreu um erro')
      setLoading(false)
      setError(true)
    }
  }

  return <styles.main>
    <styles.back>
      <BackIcon
        className='backIcon'
        onClick={() => {
          navigate('/login')
        }}
      />
    </styles.back>
    <styles.form onSubmit={submit}>
      <styles.logo>
        <img
          src={logo}
          alt='Tech Amazon Logo'
        />
        <styles.title>
          Uirapuru
        </styles.title>
        <styles.subtitle>
          SOFTWARE DE GESTÃO DE ENERGIA ELÉTRICA
        </styles.subtitle>
      </styles.logo>

      {emailSent ?
        <styles.message>
          Enviamos um link para o seu email
        </styles.message>
        :
        <>
          <styles.label>
            E-mail ou nome de usuário
          </styles.label>
          <styles.input
            required
            onChange={event => {
              setUsername(event.target.value)
            }}
            placeholder="E-mail ou nome de usuário"
          />
        </>
      }

      {loading ?
        <styles.loading>
          <util.circularProgress />
        </styles.loading>
        : emailSent ?
          <util.classicButton
            onClick={() => {
              navigate('/login')
            }}
          >
            FAZER LOGIN
          </util.classicButton>
          :
          <util.classicButton
            type='submit'
          >
            ENVIAR LINK
          </util.classicButton>
      }

      {error ?
        <styles.error>
          {errorMessage}
        </styles.error>
        : null
      }
    </styles.form>
  </styles.main>
}

export default ForgotPassword
