import React from 'react'
import Options from './components/Options';

function Questions ({question, dispatch, answer}) {
  console.log(question);
  return (
    <div>
{/* <h4>{question.question}</h4> */}
<Options question = {question} dispatch ={dispatch} answer={answer}/>
{/* <div className='options'>
  {question.options.map((option)=>(
    <button className='btn btn-option' key={option}>{option}</button>
  ))}
</div> */}
    </div>
  )
}

export default Questions