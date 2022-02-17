import React, { useEffect, useState } from 'react'

import Header from '../../blocks/Header/Header'
import Modal from '../../blocks/Modal/Modal'
import { RouteComponentProps } from 'react-router'

import api from '../../../services/api'
import storage from '../../../services/storage'

import { FaTrashAlt as DeleteIcon } from 'react-icons/fa'
import { BiUndo as UndoIcon } from 'react-icons/bi'
import { MdLocationOn as LabIcon } from 'react-icons/md'

import styles from './Labs.style'
import util from '../../../utils/styles'
import { LabModel } from '../../../@types'
const Labs: React.FC<RouteComponentProps> = ({ history }) => {
  const [labs, setLabs] = useState<LabModel[]>()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [labIdToDelete, setLabIdToDelete] = useState<string>()
  const isAdmin = storage.read('user').is_admin
  const [deleteSchedule, setDeleteSchedule] = useState<{
    [key: string]: any
  }>({})

  useEffect(() => {
    (async () => {
      const result = await api.request({
        method: 'get',
        route: '/lab/list'
      })

      if (result?.status === 200) {
        setLabs(result?.data?.labs)
        setLoading(false)
      } else {
        history.push('/login')
      }
    })()
  }, [])

  const fetch = async (labId: string | undefined) => {
    setLoading(true)

    if (labId) {
      const lab = labs?.filter(lab => lab.id === labId)[0]

      if (lab) {
        storage.write('lab', lab)
        history.push('/products')
      } else {
        history.push('/login')
      }
    }
  }

  const remove = async () => {
    setShowModal(false)

    const timeout = setTimeout(async () => {
      const result = await api.request({
        method: 'delete',
        route: '/lab/delete',
        query: {
          id: labIdToDelete
        }
      })

      if (labIdToDelete) {
        const _deleteSchedule = deleteSchedule
        Object.keys(_deleteSchedule).forEach(key => {
          if (key === labIdToDelete) {
            _deleteSchedule[key] = undefined
          }
        })
        setDeleteSchedule(_deleteSchedule)
      }

      if (result?.status === 200 && labIdToDelete) {
        if (labs) {
          let _labs = labs
          _labs = _labs.filter(lab =>
            lab.id != labIdToDelete
          )
          setLabs(_labs)
        }
      }
    }, 10000)

    if (labIdToDelete) {
      const _deleteSchedule = deleteSchedule
      _deleteSchedule[labIdToDelete] = timeout
      setDeleteSchedule(_deleteSchedule)
    }
  }

  return <styles.main>
    {showModal ?
      <Modal
        message='Você tem certeza?'
        taskOnYes={remove}
        taskOnNo={() => {
          setShowModal(false)
        }}
      />
      : null
    }

    <Header
      title='Lista de Laboratórios'
      backButton={() => {
        history.push('/options')
      }}
    />

    {!loading ?
      labs?.length ?
        <styles.list>
          <util.blackButton
            onClick={() => {
              history.push('/lab')
            }}
          >
            Novo Laboratório
          </util.blackButton>
          {labs.map((lab, index) =>
            <styles.container
              key={index}
            >
              {lab.id ?
                deleteSchedule[lab.id] ?
                  <util.criticalButton
                    onClick={() => {
                      if (lab.id) {
                        if (deleteSchedule[lab.id]) {
                          window.clearTimeout(deleteSchedule[lab.id])
                        }

                        const _deleteSchedule = deleteSchedule

                        Object.keys(_deleteSchedule).forEach(key => {
                          if (key === lab.id) {
                            _deleteSchedule[key] = undefined
                          }
                        })
                        setDeleteSchedule(_deleteSchedule)
                      }
                    }}
                  >
                    <UndoIcon className='icon' />
                    Desfazer
                  </util.criticalButton>
                  :
                  <>
                    <styles.lab
                      onClick={() => {
                        fetch(lab.id)
                      }}
                    >
                      <LabIcon
                        className='lab-icon'
                      />
                      <styles.infos>
                        <p
                          className='name'
                        >
                          {lab.name}
                        </p>
                        <p>{lab.location}</p>
                      </styles.infos>
                    </styles.lab>

                    {isAdmin ?
                      <DeleteIcon
                        className='icon'
                        onClick={() => {
                          setLabIdToDelete(lab.id)
                          setShowModal(true)
                        }}
                      />
                      : null
                    }
                  </>
                : null
              }
            </styles.container>
          )}
        </styles.list>
        :
        <styles.noLab>
          <util.blackButton
            onClick={() => {
              history.push('/lab')
            }}
          >
            Novo Laboratório
          </util.blackButton>

          <p>Não há laboratórios cadastrados</p>
        </styles.noLab>
      :
      <styles.loading
        data-testid='loading'
      >
        <util.circularProgress />
      </styles.loading>
    }
  </styles.main>
}

export default Labs
