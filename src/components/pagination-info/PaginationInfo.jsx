import styled from 'styled-components'

const Container = styled.p`
  font-size: 1.2rem;
`

const TotalInfo = styled.span`
  display: block;
  font-size: 12px;
  margin-top: 5px;
`

export default function PaginationInfo({page, numberOfPages, total}) {
  return (
    <Container>
      Página {page} de {numberOfPages} páginas.<br />
      <TotalInfo>{total} episódios encontrados.</TotalInfo>
    </Container>
  )
}