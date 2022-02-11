/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENV from '../env';
import Card from '../components/card/Card'
import './App.css';
import mixpanel from '../plugins/mixpanel';

mixpanel.track('Page Loaded');

let timer;

function App() {
  const [episodes, setEpisodes ] =  useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true);
    const response = await axios.get(`${ENV.api}/episodes`);
    setEpisodes([...episodes, ...response.data.data]);
    setLoading(false);
  }, [])

  const handleChange = (event) => {
    setLoading(true);
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(async () => {
      const config = { params: { q: event.target.value }}
      const response = await axios.get(`${ENV.api}/episodes`, config);
      setEpisodes(response.data.data);
      setLoading(false);
    }, 600);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon</h1>
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
