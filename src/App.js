import { useState } from 'react';
import database from './base.json';
import Card from './components/card/Card'
import './App.css';


function App() {
  const [base, setBase ] =  useState(database)

  const handleChange = (event) => {
    const newBase = database.filter(item => {
      const text = JSON.stringify(item);
      return text.search(event.target.value) !== -1;
    })

    setBase(newBase);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Café com Dungeon</h1>
        <form>
          <input type="text" class="search" placeholder="Pesquise.." aria-label="Pesquise" onChange={handleChange} />
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
                />
              )
            })
          }
        </main>
    </div>
  );
}

export default App;
