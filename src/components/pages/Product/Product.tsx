import React, { useState, useEffect } from 'react'

import Header from '../../blocks/Header/Header'

import api from '../../../services/api'
import {
  validate
} from '../../../services/validation'

import { FaTrashAlt as DeleteIcon } from 'react-icons/fa'

import styles from './Product.style'
import util from '../../../utils/styles'
import storage from '../../../services/storage'
import { RouteComponentProps } from 'react-router'
import { ProductModel } from '../../../@types'
import Symbols from '../../blocks/Symbols/Symbols'

import CORROSIVO from '../../../assets/CORROSIVO.png'
import EXPLOSIVO from '../../../assets/EXPLOSIVO.png'
import GAS_SOB_PRESSAO from '../../../assets/GAS_SOB_PRESSAO.png'
import INFLAMAVEL from '../../../assets/INFLAMAVEL.png'
import IRRITANTE from '../../../assets/IRRITANTE.png'
import OXIDANTE from '../../../assets/OXIDANTE.png'
import PERIGO_A_SAUDE from '../../../assets/PERIGO_A_SAUDE.png'
import PERIGO_AO_MEIO_AMBIENTE from '../../../assets/PERIGO_AO_MEIO_AMBIENTE.png'
import TOXICO from '../../../assets/TOXICO.png'

const symbolsIndex: { [key: string]: string } = {
  CORROSIVO,
  EXPLOSIVO,
  GAS_SOB_PRESSAO,
  INFLAMAVEL,
  IRRITANTE,
  OXIDANTE,
  PERIGO_A_SAUDE,
  PERIGO_AO_MEIO_AMBIENTE,
  TOXICO
}

const Product: React.FC<RouteComponentProps> = ({ history }) => {
  const [product, setProduct] = useState<ProductModel>()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const [isAdmin] = useState(storage.read('user')?.is_admin)
  const [productId] = useState(window.location.href.split('?')[1])
  const [showModal, setShowModal] = useState(false)
  const [symbols, setSymbols] = useState<string>()
  const user = storage.read('user')

  useEffect(() => {
    (async () => {
      if (productId) {
        setLoading(true)
        const result = await api.request({
          method: 'get',
          route: '/product/data',
          query: {
            id: productId
          },
          noStore: true
        })

        if (result?.status === 200) {
          const _product = result?.data?.product
          setProduct(_product)
          setSymbols(_product.symbols)
          setLoading(false)
        } else {
          setLoading(false)
        }
      } else {
        const _product = {
          name: '',
          synonym: '',
          symbols: '',
          class: '',
          subclass: '',
          storage: '',
          incompatibility: '',
          precautions: '',
          user_id: user.id
        }

        setProduct(_product)
        setLoading(false)
      }
    })()
  }, [])

  const submit = async (product: ProductModel | undefined) => {
    setLoading(true)
    setErrorMessage(null)

    if (product && validate.form('#product-form')) {
      if (productId) {
        const result = await api.request({
          route: '/product/update',
          method: 'put',
          body: {
            ...product,
            symbols
          }
        }).catch((err: any) => {
          console.log(`SUBMIT ERROR> ${err.message}`)
        })

        if (result?.status === 200) {
          history.push('/products')
        } else {
          setErrorMessage('Preencha os campos corretamente')
          setLoading(false)
        }
      } else {
        const result = await api.request({
          route: '/product/create',
          method: 'post',
          body: {
            ...product,
            symbols
          }
        }).catch((err: any) => {
          console.log(`SUBMIT ERROR> ${err.message}`)
        })

        if (result?.status === 201) {
          history.push('/products')
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

  const deleteSymbol = (index: number) => {
    if (symbols) {
      const _symbolsArray = JSON.parse(symbols)

      if (_symbolsArray.length) {
        _symbolsArray.splice(index, 1)
        setSymbols(JSON.stringify(_symbolsArray))
      }
    }
  }

  return <styles.main>
    {showModal ?
      <Symbols
        storeSymbolId={symbolId => {
          let arrayOfSymbols: string[] | null = null

          try {
            arrayOfSymbols = JSON.parse(symbols ?? '[]')
            arrayOfSymbols ? arrayOfSymbols.push(symbolId) : null
          } catch (err) {
            arrayOfSymbols = [symbolId]
          }

          setSymbols(JSON.stringify(arrayOfSymbols))
          setShowModal(false)
        }}
        taskOnCancel={() => {
          setShowModal(false)
        }}
      />
      : null
    }

    <Header
      title='Produto'
      backButton={() => {
        history.goBack()
      }}
    />

    {!loading ?
      <styles.form id='product-form'>
        <styles.label htmlFor='synonym'>
          Nome*
        </styles.label>
        <styles.textarea
          id='synonym'
          required
          minLength={3}
          maxLength={500}
          defaultValue={product?.name}
          onChange={event => {
            const _product = product
            typeof _product?.name === 'string' ?
              _product.name = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>

        <styles.label htmlFor='synonym'>
          Sinônimos*
        </styles.label>
        <styles.textarea
          id='synonym'
          required
          minLength={3}
          maxLength={500}
          defaultValue={product?.synonym}
          onChange={event => {
            const _product = product
            typeof _product?.synonym === 'string' ?
              _product.synonym = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>

        <styles.label>
          Pictogramas*
        </styles.label>

        <styles.imageContainer>
          <div>
            {symbols ?
              JSON.parse(symbols)
                .map((symbol: string, index: number) =>
                  <styles.imagePreview>
                    <img
                      key={symbol}
                      alt='Imagem não encontrada'
                      src={symbolsIndex[symbol]}
                    />

                    <DeleteIcon
                      className='icon'
                      onClick={() => {
                        deleteSymbol(index)
                      }}
                    />
                  </styles.imagePreview>
                )
              : null
            }
          </div>
        </styles.imageContainer>

        <util.classicButton
          onClick={event => {
            event.preventDefault()
            setShowModal(true)
          }}
        >
          Adicionar
        </util.classicButton>

        <styles.label htmlFor='class'>
          Classe*
        </styles.label>
        <styles.textarea
          id='class'
          required
          minLength={3}
          maxLength={20}
          defaultValue={product?.class}
          onChange={event => {
            const _product = product
            typeof _product?.class === 'string' ?
              _product.class = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>

        <styles.label htmlFor='subclass'>
          Subclasse*
        </styles.label>
        <styles.textarea
          id='subclass'
          required
          minLength={3}
          maxLength={20}
          defaultValue={product?.subclass}
          onChange={event => {
            const _product = product
            typeof _product?.subclass === 'string' ?
              _product.subclass = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>


        <styles.label htmlFor='storage'>
          Condições de armazenamento*
        </styles.label>
        <styles.textarea
          id='storage'
          required
          minLength={3}
          maxLength={500}
          defaultValue={product?.storage}
          onChange={event => {
            const _product = product
            typeof _product?.storage === 'string' ?
              _product.storage = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>

        <styles.label htmlFor='incompatibility'>
          Incompatibilidade*
        </styles.label>
        <styles.textarea
          id='incompatibility'
          required
          minLength={3}
          maxLength={500}
          defaultValue={product?.incompatibility}
          onChange={event => {
            const _product = product
            typeof _product?.incompatibility === 'string' ?
              _product.incompatibility = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 3 caracteres.
        </p>

        <styles.label htmlFor='precautions'>
          Precauções*
        </styles.label>
        <styles.textarea
          id='precautions'
          required
          minLength={10}
          maxLength={500}
          defaultValue={product?.precautions}
          onChange={event => {
            const _product = product
            typeof _product?.precautions === 'string' ?
              _product.precautions = event.target.value
              : null
            setProduct(_product)
          }}
        />
        <p className='error-message'>
          Digite no mínimo 10 caracteres.
        </p>

        {!loading && isAdmin ?
          <util.classicButton
            onClick={event => {
              event.preventDefault()
              submit(product)
            }}
          >
            Salvar
          </util.classicButton>
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
      :
      <styles.loadingAll>
        <util.circularProgress />
      </styles.loadingAll>
    }
  </styles.main>
}

export default Product
