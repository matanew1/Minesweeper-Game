import './App.css';
import Board from './Board.jsx';

function App() {
  return (
    <div className="App">
      <Board rows={5} columns={5} mines={5} />
    </div>
  );
}

export default App;
