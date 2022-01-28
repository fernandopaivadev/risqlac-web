import styled from 'styled-components'

const main = styled.div`
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--black);
    width: 100%;
    height: 10rem;
    bottom: 0;
`

const logo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem auto 1.5rem auto;
    align-items: center;

    img {
        width: 13.5rem;
        margin: 0 1.5rem 0 0;
    }
`

const title = styled.p`
    font-size: 3.5rem;
    letter-spacing: 0.3rem;
    color: var(--black);
    margin-top: -4rem;
`

const buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        width: 35rem;
        height: 7rem;
        margin: 1.5rem;
        border: none;
        background: var(--gray);
        border-radius: 0.5rem;
        font-size: 1.9rem;
        letter-spacing: 0.2rem;
        box-shadow: 0.5rem 0.3rem 0.6rem var(--transparent-black);
    }
`
const option = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    background: var(--black);
    color: var(--white);
    border-top: 1.5rem solid var(--black);
    border-left: none;
    border-right: none;
    border-bottom: none;

    .icon {
        font-size: 3.5rem;
        border: none;
    }

   p {
       font-size: 1.8rem;
       font-weight: 600;
       letter-spacing: 0.2rem;
   }
`

export default {
  main,
  logo,
  title,
  buttons,
  option
}