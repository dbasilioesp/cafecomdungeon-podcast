import { useState, useEffect } from 'react';
import axios from 'axios';
// import database from './base.json';
import Card from './components/card/Card'
import './App.css';
import mixpanel from './plugins/mixpanel';

mixpanel.track('Page Loaded');

function App() {
  const [episodes, setEpisodes ] =  useState([])
  // const timerRef = useRef(null);

  async function getEpisodes() {
    const response = await axios.get('http://localhost:3000/episodes');
    setEpisodes(response.data.items);
  }

  useEffect(() => { 
    getEpisodes();
  }, [])
  
  const handleChange = (event) => {
    // const newBase = database.filter(item => {
    //   const text = JSON.stringify(item);
    //   return text.search(event.target.value) !== -1;
    // })
    
    // window.clearTimeout(timerRef.current);
    
    // if(event.target.value.length >= 3) {  
    //   timerRef.current = setTimeout(() => {
    //     mixpanel.track('Search', {query: event.target.value});
    //   }, 1000);
    // }
    
    // setBase(newBase);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon</h1>
        <div className="app__search">
          <input type="text" className="search" placeholder="Pesquise.." aria-label="Pesquise" onChange={handleChange} />
        </div>
        </header>
        <main className="card-grid">
          {
            episodes.map(item => {
              return (
                <Card 
                  id={item.id}
                  title={item.name}
                  description={item.html_description}
                  link={item.uri}
                  key={item.id}
                />
              )
            })
          }
        </main>
    </div>
  );
}

export default App;
