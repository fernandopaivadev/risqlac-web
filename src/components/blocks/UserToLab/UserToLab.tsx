import React, { useEffect, useState } from 'react'
import { LabModel, UserToLabComponent } from '../../../@types'
import api from '../../../services/api'
import util from '../../../utils/styles'
import styles from './UserToLab.style'

const Symbols: React.FC<UserToLabComponent> = ({
  taskOnComplete,
  taskOnCancel,
  data
}) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [targetLabId, setTargetLabId] = useState<string>()
  const [labs, setLabs] = useState<LabModel[]>()

  useEffect(() => {
    (async () => {
      setLoading(true)

      const result = await api.request({
        method: 'get',
        route: '/lab/list'
      })
      console.log(result)
      if (result?.status === 200) {
        setLabs(result.data?.labs as LabModel[])
        setLoading(false)
      }
    })()
  },[])

  const submit = async () => {
    const result = await api.request({
      method: 'post',
      route: '/user/add-lab',
      query: {
        ...data,
        lab_id: targetLabId
      }
    })

    if (result?.status === 201) {
      taskOnComplete()
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return <styles.main>
    <styles.window>
      {!loading ?
        labs?.length ?
          <>
            <select
              id='select'
              onChange={event => {
                const labId = labs.find(lab =>
                  lab.name.toUpperCase() === event.target.value
                )?.id

                if (labId) {
                  setTargetLabId(labId)
                }
              }}
            >

              <option>
                Escolha o laboratório
              </option>
              {labs.map(lab =>
                <option>{lab.name.toUpperCase()}</option>
              )}
            </select>

            <div className='buttons'>
              <util.classicButton
                onClick={() => {
                  if (targetLabId) {
                    submit()
                  } else {
                    setError(true)
                    setTimeout(() => {
                      setError(false)
                    }, 3000)
                  }
                }}
              >
                Selecionar
              </util.classicButton>

              <util.criticalButton
                onClick={taskOnCancel}
              >
                Cancelar
              </util.criticalButton>
            </div>
          </>
          : null
        :
        <styles.loading>
          <util.circularProgress />
        </styles.loading>
      }
      {error ?
        <p className='error-message'>
          Por favor escolha um laboratório
        </p>
        : null
      }
    </styles.window>
  </styles.main>
}

export default Symbols
