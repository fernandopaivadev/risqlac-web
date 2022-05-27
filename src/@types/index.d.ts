import { Method } from 'axios'
import FormData from 'form-data'

export namespace APIRequest {
  interface Options {
    method: Method
    route: string
    query?: { [key: string]: any }
    body?: {
      [key: string]: any
    }
    formData?: FormData
    store?: boolean
  }

  interface Response {
    status: number,
    data?: {
      [key: string]: any
    } | null
  }
}

export namespace Models {
  interface User {
    id: string
    username: string
    is_admin?: boolean
    name: string
    email: string
    phone: string
    created_at: Date
    updated_at: Date
  }

  type NewUser = Omit<User, 'id', 'created_at', 'updated_at'>

  type Users = {
    id: number
    username: string
    email: string
    phone: string
    is_admin: string
  }[]
}

export namespace Components {
  interface Header {
    color?: string
    fontColor?: string
    backButton: () => void
    title: string
  }

  interface Buttons {
    buttons: {
      name: string
      color: string
      fontColor?: string
      onClick: () => void
    }[]
    header: Header
  }

  interface Modal {
    message: string | ReactElement
    ok?: {
      text: string
      onClick: () => void
    },
    cancel: {
      text: string
    }
    onRequestClose: () => void
    isOpen: boolean
  }
}

export type SubmitEvent = React.FormEvent<HTMLFormElement>

export namespace Storage {
  export type key =
    'user' |
    'loggedUser' |
    'unit' |
    'token'
}

