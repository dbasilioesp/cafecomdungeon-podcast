import './search-input.css'

export default function ({total, onChange}) {
  return (
    <div className="search">
      <input type="text"   placeholder="Pesquise.." aria-label='Pesquisa' onChange={onChange} />
      <span>{total} episódios encontrados.</span>
    </div>
  )
}