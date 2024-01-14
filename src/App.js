// import logo from './logo.svg';
import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Timer from './components/Timer';
import FinishedScreen from './components/FinishedScreen';
import Footer from './components/Footer';
// import DateCounter from '../src/DateCounter'

const SECS_PER_QUESTION = 30
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: null,
  secondsRemaining: null,
  // "loading", "error", "ready", "active", "finished"
}

function reducer(state, action){
switch(action.type){
  case 'dataReceived':
    return{
      ...state, questions: action.payload, status: "ready"
    };
    case 'dataFailed':
      return{
        ...state, status: 'error'
      }
      case 'start':
  return{...state, status:'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION
  };
  case 'newAnswer':
    const question = state.questions.at(state.index);
    return{
      ...state,answer:action.payload, 
      points: action.payload === question.correctOption? state.points + question.points : state.points,
    };
    case 'nextQuestion':
      return{...state,index: state.index + 1, answer:null};

      case 'finish':
        return{...state, status: 'finished',
        highscore: state.points > state.highscore ? state.points:state.highscore}
        case 'restart':
          return{...state,point:0,highscore:0,index:0, status:'ready',answer:null};
          // we could write using the style below
          // return{
          //   ...initialState,questions:state.questions,status:'ready'
          // }

          case'tick':
          return{
            ...state, 
            secondsRemaining: state.secondsRemaining - 1, 
             status: state.secondsRemaining === 0 ? 'finished':state.status,
          }
    default:
      throw new Error("Action unknown")
}

}

function App() {

  const [{questions, status, index, answer,points, highscore, secondsRemaining}, dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev,cur)=> prev + cur.points,
    0
  );
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res)=>res.json())
    .then((data)=> dispatch({type:"dataReceived", payload: data}))
    .catch((err)=> dispatch({type:"dataFailed"}))
  },[]);
  return (
    <div className='app'>
      <Header/>
      <Main>
      {/* <p>1/15</p>
        <p>Question?</p> */}
        {status === 'loading' && <Loader/> },
        {status === 'error' && <Error/> },
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch ={dispatch}/> }
        {status === 'active' && (
          <div>
            {/* we can also use empty fragments i.e <></>. The error message initially that prompted the use of <div></div>
was that: JSX can only have one parent */}
 <Progress 
 index = {index} 
 numQuestions = {numQuestions} 
 points={points}
 maxPossiblePoints ={maxPossiblePoints}
 answer = {answer}
 />
        <Questions question ={questions[index]}
        dispatch={dispatch} answer={answer}/> 
        <Footer>
          <Timer dispatch = {dispatch} secondsRemaining={secondsRemaining}/>
        <NextButton dispatch ={dispatch} answer={answer} index = {index} numQuestions = {numQuestions}/>
        </Footer>
       
        </div>
        )}
        {status === 'finished' && <FinishedScreen
        points ={points} maxPossiblePoints= {maxPossiblePoints}  dispatch = {dispatch}highscore = {highscore} />}


      </Main>
     
    </div>
  );
}

export default App;
