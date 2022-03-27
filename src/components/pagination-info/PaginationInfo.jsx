import styled from 'styled-components'

const Container = styled.p`
  font-size: 1.2rem;
`

export default function PaginationInfo({page, numberOfPages}) {
  return (
    <Container>
      Página {page} de {numberOfPages} páginas.<br />
    </Container>
  )
}
