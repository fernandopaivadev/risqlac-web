import styled from 'styled-components'

const main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: var(--white);
`

const form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100rem;
    padding: 3em;

    .error-message {
        display: none;
        text-align: center;
        font-size: 1.5rem;
        color: var(--red);
        margin: 0 0 1.3rem 0;
    }
`

const label = styled.label`
    font-size: 1.6rem;
    color: var(--black);
    width: 100%;
    text-align: left;
    letter-spacing: 0.1rem;
`

const input = styled.input`
    margin: 0.5rem 0 1.5rem 0;
    width: 100%;
    height: 4rem;
    border-radius: 0.8rem;
    border: 2px solid var(--black);
    font-size: 1.8rem;
    padding: 1rem;
    color: var(--black);
`


const smallInputs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const inputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0.3rem;
`

const smallInput = styled(input)`
    width: 100%;
`

const saveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17rem;
    height: 5rem;
    background: var(--black);
    color: var(--white);
    font-size: 1.9rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    border: none;
    border-radius: 0.8rem;
    margin: 1.2rem;
`

const loading = styled.div`
    width: 5rem;
    height: 5.5rem;
    margin: 2rem auto 0 auto;
`

const errorMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0rem 1rem 1rem 1rem;
    font-weight: 600;
    color: var(--red);
`
export default {
  main,
  form,
  input,
  smallInputs,
  inputsContainer,
  label,
  smallInput,
  saveButton,
  loading,
  errorMessage
}