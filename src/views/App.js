import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ENV from '../env';
import Card from '../components/card/Card'
import './App.css';
import mixpanel from '../plugins/mixpanel';

mixpanel.track('Page Loaded');

const LIMIT = 20;

function App() {
  const [episodes, setEpisodes ] =  useState([])
  const [currentPage, setPage ] =  useState(1)
  const [total, setTotal] = useState(9999)
  const [loading, setLoading] = useState(false)

  const getEpisodes = useCallback(async (page) => {
    setLoading(true);
    const offset = (page - 1) * (LIMIT + 1);
    const config = {params: { limit: LIMIT, offset }}
    const response = await axios.get(`${ENV.api}/episodes`, config);
    setTotal(response.data.total)
    setEpisodes([...episodes, ...response.data.items]);
    setLoading(false);
  }, [setLoading, setTotal, setEpisodes, episodes])

  const intersectPagination = useCallback(() => {
    const callbackObserver = (entries, observer) => {
      for (const entry of entries) {
        if(entry.isIntersecting){
          observer.unobserve(entry.target);
          setPage(currentPage + 1);
          mixpanel.track('Paginating', {page: currentPage + 1});
        }
      }
    }
    const configObserver = {rootMargin: '0px 0px -90px 0px'};
    const observer = new IntersectionObserver(callbackObserver, configObserver);
    observer.observe(document.querySelector('footer'))
  }, [currentPage, setPage])
  
  useEffect(() => {
    getEpisodes(currentPage)
  }, [currentPage, getEpisodes])

  useEffect(() => {
    if (episodes.length > 0 && episodes.length < total){
      setTimeout(() => {
        intersectPagination()
      }, 1000);
    }
  }, [episodes, total, intersectPagination])

  return (
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon</h1>
        </header>
        <main className="card-grid">
          {
            episodes.map((item, index) => {
              return (
                <Card 
                  id={item.id}
                  title={item.name}
                  description={item.html_description}
                  link={item.uri}
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
