import './search-input.css'

export default function SearchInput({onChange}) {
  return (
    <div className="search">
      <input type="text"   placeholder="Pesquise.." aria-label='Pesquisa' onChange={onChange} />
    </div>
  )
}