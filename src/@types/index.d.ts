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
    update_at?: Date,
    labs?: users[]
}

interface LabModel {
    id?: string
    name: string
    location: string
    created_at?: Date
    update_at?: Date
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
  quantity?: string
  due_date?: string
  batch?: string
  location?: string
  user_id?: string
  created_at?: Date
  updated_at?: Date
}

interface HeaderComponent extends RouteComponentProps {
    color?: string
    fontColor?: string
    backButton?: () => void
    optionsButton?: () => void
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

interface UserToLabComponent {
    taskOnCancel: () => void
    taskOnComplete: () => void
    data: {
        user_id: string
        access_level: 'admin' | 'student'
    }
}

export {
  APIRequestOptions,
  CustomAxiosInstance,
  RealTimeBuffer,
  WebsocketConfigOptions,
  UserModel,
  LabModel,
  ProductModel,
  HeaderComponent,
  ButtonsComponent,
  ModalComponent,
  NavBarComponent,
  SubmitEvent,
  SymbolsComponent,
  UserToLabComponent
}
