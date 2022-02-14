/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENV from '../env';
import Card from '../components/card/Card'
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
  const [search, setSearch] = useState(null)

  async function nextPage(pageParam) {
    setPage(pageParam)
    await getEpisodes(pageParam, search);
  }

  async function getEpisodes(page, search) {
    const config = { params: { page, q: search }}
    
    const { data } = await axios.get(`${ENV.api}/episodes`, config);
    setTotal(data.total);
    setEpisodes([...data.data]);
  }

  function searchEpisodes(searchParam) {
    setLoading(true);
    if (timer) { clearTimeout(timer) }

    timer = setTimeout(async () => {
      setSearch(searchParam);
      await getEpisodes(page, searchParam);
      setLoading(false);
    }, 600);
  }

  useEffect(async () => {
    setLoading(true);
    await getEpisodes(page);
    setLoading(false);
  }, [])

  const handleChange = (event) => {
    searchEpisodes(event.target.value)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon - {total}</h1>
        <form>
          <input type="text" class="search"  placeholder="Pesquise.." aria-label='Pesquisa' onChange={handleChange} />
        </form>
      </header>
      <main className="card-grid">
        {
          episodes.map((item, index) => {
            return (
              <Card 
                id={item.id}
                title={item.name}
                description={item.htmlDescription}
                link={item.hosts[0].uri}
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
