import React, {useState} from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const MaxVotes = (props) => {
  let index = -1;
  let maxVotesValue = index;
  for (let i = 0; i < 7; i++) {
    if (props.votes[i] > maxVotesValue) {
      index = i;
      maxVotesValue = props.votes[i];      
    }
   }

   return (
     <div>
       {props.anecdotes[index]} has {maxVotesValue} votes 
     </div>
   )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);  
  const [votes, setVotes] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const handleVoteClick = (props) => {            
    setVotes({...votes, [selected]: votes[selected] + 1 });    
  }

  const handleAnecdoteClick = () => {          
    const max = 5.99999;
    let rand = Math.floor(Math.random()*max);    
    setSelected(rand)
  }  
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <Button onClick={handleVoteClick} text='vote' />        
      <Button onClick={handleAnecdoteClick} text='next anecdote' />              
      <br></br>
      <h2>Anecdote with most votes</h2>  
      <MaxVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

 
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
