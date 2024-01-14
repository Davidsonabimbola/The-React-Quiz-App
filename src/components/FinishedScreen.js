import React from 'react'

const FinishedScreen = ({points, maxPossiblePoints, highscore, dispatch}) => {
    const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
     <p className='result'>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}
        ({Math.ceil(percentage)}%)
        <p> (Highscore:{highscore} points)</p>
    </p>

    <button className='btn btn-ui' onClick={()=>dispatch({type: 'restart'})}>
Restart Quiz
    </button>
    
    </>
   
  )
}

export default FinishedScreen