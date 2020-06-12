import React from 'react';
import ItemList from './components/ItemList';
import './App.css';

const App = () => {
  return (
    <div>
      {/* <h1>React-Firebase Todo App</h1> */}
      <img className='title' src='https://zukan.pokemon.co.jp/img/logo.svg'></img>
      <ItemList />
    </div>
  );
}
export default App;