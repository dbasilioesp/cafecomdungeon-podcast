import { useRef, useState } from 'react';
import database from './base.json';
import Card from './components/card/Card'
import './App.css';
import mixpanel from './plugins/mixpanel';

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
    <div className="app">
      <header className="app__header">
        <h1>Café com Dungeon</h1>
        <div className="app__search">
          <input type="text" className="search" placeholder="Pesquise.." aria-label="Pesquise" onChange={handleChange} />
        </div>
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
