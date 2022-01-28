import React from 'react'

import { ModalComponent } from '../../../@types'
import styles from './Modal.style'
import util from '../../../utils/styles'

const Modal: React.FC<ModalComponent> = ({ message, taskOnYes, taskOnNo }) =>
  <styles.main>
    <styles.window
      data-testid='window'
    >
      <p data-testid='message'>
        {message}
      </p>
      <div>
        <util.classicButton
          id='yes'
          data-testid='yes'
          onClick={taskOnYes}
        >
                    Sim
        </util.classicButton>
        <util.criticalButton
          id='no'
          data-testid='no'
          onClick={taskOnNo}
        >
                    Não
        </util.criticalButton>
      </div>
    </styles.window>
  </styles.main>

export default Modal