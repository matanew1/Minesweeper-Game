import './App.css';
import Board from './Board.jsx';

function App() {
  return (
    <div className="App">
      <Board rows={10} columns={20} mines={50} />
    </div>
  );
}

export default App;
