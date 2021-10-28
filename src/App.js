import { useRef, useState } from 'react';
import database from './base.json';
import Card from './components/card/Card'
import './App.css';
import mixpanel from 'mixpanel-browser';

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('87bd792ed0bb2f5e6767071887c161dd', {debug: false}); 
mixpanel.track('Page Loaded');

function App() {
  const [base, setBase ] =  useState(database)
  const timerRef = useRef(null);
  
  const handleChange = (event) => {
    const newBase = database.filter(item => {
      const text = JSON.stringify(item);
      return text.search(event.target.value) !== -1;
    })
    
    window.clearTimeout(timerRef.current);
    
    if(event.target.value.length >= 3) {  
      timerRef.current = setTimeout(() => {
        mixpanel.track('Search', {query: event.target.value});
      }, 1000);
    }
    
    setBase(newBase);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Café com Dungeon</h1>
        <form>
          <input type="text" className="search" placeholder="Pesquise.." aria-label="Pesquise" onChange={handleChange} />
        </form>
        </header>
        <main className="card-grid">
          {
            base.map(item => {
              return (
                <Card 
                  id={item['Nº']}
                  title={item['Episódio']}
                  description={item['Descrição']}
                  category={item['Categoria']}
                  rpg={item['RPG']}
                  links={item['Links']}
                  key={item['Nº']}
                />
              )
            })
          }
        </main>
    </div>
  );
}

export default App;
