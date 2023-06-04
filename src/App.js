import './App.css';
import Board from './Board.jsx';

function App() {
  return (
    <div className="App">
      <Board rows={10} columns={10} mines={20} />
    </div>
  );
}

export default App;
