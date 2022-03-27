import './search-input.css'
import styled from "styled-components";

const SearchInputStyled = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 18px;
`

export default function SearchInput({onChange}) {
  return (
    <div className="search">
      <SearchInputStyled type="text" placeholder="Pesquise.." aria-label='Pesquisa' onChange={onChange} />
    </div>
  )
}
