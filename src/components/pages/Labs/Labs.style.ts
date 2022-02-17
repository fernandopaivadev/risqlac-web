import styled from 'styled-components'

const main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background-color: var(--white);
`

const list = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    min-height: 100vh;
`

const container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .icon {
        font-size: 2.5rem;
    }

    .lab-icon {
        font-size: 5rem;
        width: 100%;
    }

`

const lab = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: center;
    height: 13rem;
    width: 37.8rem;
    border-radius: 0.5rem;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--shadow);
    margin: 2rem;
    background: var(--transparent-yellow);
    word-break: break-word;

    img {
        height: 7.1rem;
        width: 7.5rem;
        margin: auto;
    }
`

const infos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        color: var(--black);
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 0.2rem;
        margin: 0 3rem 0.5rem 0;
    }

    .name {
        font-weight: 600;
    }
`
const noLab = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 90vh;
    width: 30rem;
    p {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--black);
    }
`

const loading = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 5.5rem;
    margin: 2rem auto 0 auto;
`

export default {
  main,
  list,
  container,
  lab,
  infos,
  noLab,
  loading
}
