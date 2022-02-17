import React, { useEffect, useState } from 'react'

import Header from '../../blocks/Header/Header'
import Modal from '../../blocks/Modal/Modal'

import api from '../../../services/api'
import storage from '../../../services/storage'

import { FaTrashAlt as DeleteIcon } from 'react-icons/fa'
import { ImLab as ProductIcon } from 'react-icons/im'

import styles from './Products.style'
import util from '../../../utils/styles'
import { ProductModel } from '../../../@types'
import { RouteComponentProps } from 'react-router'

const Products: React.FC<RouteComponentProps> = ({ history }) => {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [productId, setProductId] = useState<string>()
  const [searchBy, setSearchBy] = useState('Nome')
  const [productsToShow, setProductsToShow] = useState<ProductModel[]>([])
  const lab = storage.read('lab')
  const isAdmin = storage.read('user')?.is_admin

  useEffect(() => {
    (async () => {
      const result = await api.request({
        method: 'get',
        route: '/product/list',
        query: {
          id: lab.id
        }
      })

      if (result?.status === 200) {
        setProducts(result?.data?.products)
        setProductsToShow(result?.data?.products)
        setLoading(false)
      } else {
        history.push('/login')
      }
    })()
  }, [])

  const remove = async () => {
    setShowModal(false)
    setLoading(true)

    const result = await api.request({
      method: 'delete',
      route: '/product/delete',
      query: {
        id: productId
      }
    })

    if (typeof result?.status === 'number') {
      window.location.reload()
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
      title='Lista de produtos'
      backButton={() => {
        history.goBack()
      }}
      optionsButton={() => {
        history.push('/options')
      }}
    />

    {!loading ?
      products?.length ?
        <styles.list>
          <styles.searchContainer>
            <p>
              Buscar
            </p>

            <div>
              <input
                type='text'
                placeholder='Nome/Classe'
                onChange={event => {
                  if (event.target.value === '') {
                    setProductsToShow(products)
                  } else {
                    let _productsToShow: ProductModel[] = []

                    if (searchBy === 'Nome') {
                      _productsToShow = products.filter(product =>
                        product.name.toLowerCase().includes(
                          event.target.value.toLowerCase()
                        )
                      )
                    } else if (searchBy === 'Classe') {
                      _productsToShow = products.filter(product =>
                        product.class.toLowerCase().includes(
                          event.target.value.toLowerCase()
                        )
                      )
                    }

                    setProductsToShow(_productsToShow)
                  }
                }}
              />

              <select
                onChange={event => {
                  setSearchBy(event.target.value)
                }}
              >
                <option>Nome</option>
                <option>Classe</option>
              </select>
            </div>
          </styles.searchContainer>

          <util.classicButton
            onClick={() => {
              history.push('/product')
            }}
          >
            Novo produto
          </util.classicButton>
          {productsToShow.map((product, index) =>
            <styles.container
              key={index}
            >
              <styles.product
                onClick={() => {
                  history.push(`/product?${product.id}`)
                }}
              >
                <ProductIcon
                  className='icon'
                />
                <styles.infos>
                  <p
                    className='name'
                  >
                    {product.name}
                  </p>
                  <p>{product.class}</p>
                </styles.infos>
              </styles.product>

              {isAdmin ?
                <DeleteIcon
                  className='icon'
                  onClick={() => {
                    setProductId(product.id)
                    setShowModal(true)
                  }}
                />
                : null
              }
            </styles.container>
          )}
        </styles.list>
        :
        <styles.noProduct>
          <util.classicButton
            onClick={() => {
              history.push('/product')
            }}
          >
            Novo produto
          </util.classicButton>

          <p>Não há produtos cadastrados.</p>
        </styles.noProduct>
      :
      <styles.loading
        data-testid='loading'
      >
        <util.circularProgress />
      </styles.loading>
    }
  </styles.main>
}

export default Products
