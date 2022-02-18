/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENV from '../env';
import Card from '../components/card/Card'
import PageButton from '../components/page-button/PageButton'
import SearchInput from '../components/search-input/SearchInput'
import './App.css';
import mixpanel from '../plugins/mixpanel';

mixpanel.track('Page Loaded');

let timer;
const LIMIT = 20;

function App() {

  const [episodes, setEpisodes ] =  useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage ] =  useState(1)
  const [total, setTotal] = useState(9999)
  const [numberOfPages, setNumberOfPages] = useState(9999)
  const [search, setSearch] = useState(null)
  const [nextEnable, setNextEnable] = useState(true)
  const [prevEnable, setPrevEnable] = useState(true)

  function setPageQueryParam(page) {
    const url = new URL(window.location.href)
    url.searchParams.set('page', page)
    window.history.pushState({ path: url.href }, '', url.href);
  }

  function getQueryParams() {
    const url = new URL(window.location.href)
    return url.searchParams;
  }
  
  async function nextPage() {
    const newPage = page + 1
    setPage(newPage)
    setPageQueryParam(newPage)
    await getEpisodes(newPage, search);
  }

  async function prevPage() {
    const newPage = page - 1
    setPage(newPage)
    setPageQueryParam(newPage)
    await getEpisodes(newPage, search);
  }

  async function getEpisodes(page, search) {
    console.log(page)
    const config = { params: { page: page - 1, q: search }}
    const { data } = await axios.get(`${ENV.api}/episodes`, config);
    const inNumberOfPages = Math.ceil(data.total / LIMIT)

    setTotal(data.total);
    setEpisodes([...data.data]);
    setNumberOfPages(inNumberOfPages)
    setNextEnable(page < inNumberOfPages)
    setPrevEnable(page > 1)
    console.log(page > inNumberOfPages)
  }

  function searchEpisodes(searchParam) {
    setLoading(true);
    if (timer) { clearTimeout(timer) }

    timer = setTimeout(async () => {
      setPage(1)
      setPageQueryParam(1)
      setSearch(searchParam)
      await getEpisodes(page, searchParam)
      setLoading(false);
    }, 600);
  }

  useEffect(async () => {
    setLoading(true);
    const queryParams = getQueryParams()
    const inPage = queryParams.get('page')
    const inSearch = queryParams.get('q')
    
    if (inPage) {
      setPage(Number(inPage))
    }

    if (inSearch) {
      setSearch(inSearch)
    }

    await getEpisodes(inPage || page, inSearch);
    setLoading(false);
  }, [])

  const handleChange = (event) => {
    searchEpisodes(event.target.value)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon</h1>
        <form className='search-form'>
          <SearchInput total={total} onChange={handleChange} />
          <nav className='pagination'>
            <PageButton onClick={() => prevPage()} disabled={!prevEnable}>&#60;</PageButton>
            <PageButton onClick={() => nextPage()} disabled={!nextEnable}>&#62;</PageButton>
          </nav>
        </form>
        <p style={{fontSize: '1.2rem'}}>
          Página {page} de {numberOfPages} páginas.
        </p>
      </header>
      <main className="card-grid">
        {
          episodes.map((item, index) => {
            return (
              <Card 
                id={item.id}
                title={item.name}
                description={item.htmlDescription}
                link={item.hosts[0].url}
                key={index}
              />
            )
          })
        }
      </main>
      <footer className="app__footer">
        {loading && 'Carregando mais episódios...'}
      </footer>
    </div>
  );
}

export default App;
