import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import Header from '../../blocks/Header/Header'

import storage from '../../../services/storage'
import api from '../../../services/api'
import { validate } from '../../../services/validation'
import styles from './Lab.style'
import util from '../../../utils/styles'
import { LabModel, UserModel } from '../../../@types'

const Lab: React.FC<RouteComponentProps> = ({ history }) => {
  const user: UserModel = storage.read('user')
  const [lab, setLab] = useState<LabModel>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const isAdmin = user.is_admin
  const [labId] = useState(Number(window.location.href.split('?')[1]))

  useEffect(() => {
    if (labId && user?.id) {
      setLab(storage.read('lab'))
    } else if (user?.id) {
      setLab({
        name: '',
        location: ''
      })
    }
  }, [])

  useEffect(() => {
    validate.setup('#edit-lab-form')
  }, [])

  const submit = async (lab: LabModel | undefined) => {
    setLoading(true)
    setErrorMessage(null)

    if (lab && validate.form('#edit-lab-form')) {
      if (labId) {
        const result = await api.request({
          route: '/lab/update',
          method: 'put',
          body: lab
        }).catch((err: any) => {
          console.log(`SUBMIT ERROR> ${err.message}`)
        })

        if (result?.status === 200) {
          history.push('/labs')
        } else {
          setErrorMessage('Preencha os campos corretamente')
          setLoading(false)
        }
      } else {
        const result = await api.request({
          route: '/lab/create',
          method: 'post',
          body: lab
        }).catch((err: any) => {
          console.log(`SUBMIT ERROR> ${err.message}`)
        })
        console.log(result)
        if (result?.status === 201) {
          history.push('/labs')
        } else {
          setErrorMessage('Preencha os campos corretamente')
          setLoading(false)
        }
      }
    } else {
      setErrorMessage('Preecha os campos obrigatórios')
      setLoading(false)
    }
  }

  return <styles.main>
    <Header
      title='USF'
      backButton={() => {
        history.goBack()
      }}
    />
    <styles.form id='edit-lab-form'>
      <styles.label htmlFor='name'>
        Nome
      </styles.label>
      <styles.input
        id='name'
        required
        minLength={3}
        maxLength={20}
        defaultValue={lab?.name}
        readOnly={!isAdmin}
        onChange={event => {
          const _lab = lab
          typeof _lab?.name === 'string' ? _lab.name = event.target.value : null
          setLab(_lab)
        }}
      />
      <p className='error-message'>
        Digite no mínimo 3 caracteres.
      </p>

      <styles.label htmlFor='location'>
        Location
      </styles.label>
      <styles.input
        id='location'
        required
        minLength={6}
        maxLength={20}
        defaultValue={lab?.location}
        readOnly={!isAdmin}
        onChange={event => {
          const _lab = lab
          typeof _lab?.location === 'string' ? _lab.location = event.target.value : null
          setLab(_lab)
        }}
      />
      <p className='error-message'>
        Digite no mínimo 6 caracteres.
      </p>

      {!loading ?
        isAdmin ?
          <styles.saveButton
            onClick={event => {
              event.preventDefault()
              submit(lab)
            }}
          >
            Salvar
          </styles.saveButton>
          : null
        :
        <styles.loading>
          <util.circularProgress />
        </styles.loading>
      }

      {errorMessage ?
        <styles.errorMessage>
          <p>{errorMessage}</p>
        </styles.errorMessage>
        : null
      }

    </styles.form>
  </styles.main>
}

export default Lab
