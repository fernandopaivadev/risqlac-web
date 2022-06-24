import styled from 'styled-components'

const main = styled.div`
  width: 100vw;
  min-height: 100%;
  background: var(--white);

  h1 {
    margin: 2rem;
    font-size: 3rem;
  }

  p {
    margin: 2rem;
    font-size: 2rem;
    font-weight: 500;
    text-align: justify;
  }

  ul {
    margin: 2rem;
  }

  ul > li {
    margin: 2rem;
    font-size: 2rem;
    font-weight: 500;
  }

  img {
    width: 90%;
    margin: 2rem;
  }
`

export default {
  main
}
