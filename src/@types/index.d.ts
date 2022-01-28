import { ComponentProps, SetStateAction } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface CustomAxiosInstance extends AxiosInstance {
    [key: string]: any
}

interface APIRequestOptions {
    method: string
    route: string
    query?: { [key: string]: any }
    body?: {
        [key: string]: any
    }
    noStore?: boolean
    retry?: boolean
}

interface RealTimeBuffer { [key: string]: any }[]

interface WebsocketConfigOptions {
    realTimeBuffer: RealTimeBuffer
    setRealTimeBuffer: SetStateAction
    setNewMessage: SetStateAction
}

interface UserModel {
    id?: string
    username: string
    is_admin?: boolean
    name: string
    email: string
    phone: string
    password?: string
    created_at?: Date
    update_at?: Date
}

interface RefreshTokenModel {
    id: number
    uuid: string
    user_id: number
    expiresIn: string
}

interface ProductModel {
  id?: string
  name: string
  synonym: string
  symbols?: string
  class: string
  subclass: string
  storage: string
  incompatibility: string
  precautions: string
  user_id: string
  created_at?: Date
  updated_at?: Date
}

interface HeaderComponent extends RouteComponentProps {
    color?: string
    fontColor?: string
    backButton: () => void
    title: string
}

interface ButtonsComponent extends RouteComponentProps {
    buttons: {
        name: string
        color: string
        fontColor?: string
        onClick: () => void
    }[]
    header: Header
}

interface ModalComponent extends ComponentProps {
    message: string
    taskOnYes: () => void
    taskOnNo: () => void
}


interface NavBarComponent extends RouteComponentProps {
    option: string
}

interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

interface SymbolsComponent {
    taskOnCancel: () => void
    storeSymbolId: (symbolId: string) => void
}

export {
  RefreshTokenModel,
  APIRequestOptions,
  CustomAxiosInstance,
  RealTimeBuffer,
  WebsocketConfigOptions,
  UserModel,
  ProductModel,
  HeaderComponent,
  ButtonsComponent,
  ModalComponent,
  NavBarComponent,
  SubmitEvent,
  SymbolsComponent
}
