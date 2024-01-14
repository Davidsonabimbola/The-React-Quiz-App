import React, { useEffect } from 'react'

function Timer ({dispatch, secondsRemaining})  {
  const min = Math.floor(secondsRemaining/60);
  const seconds = secondsRemaining % 60; 
  // this means seconds remaining when secondsRemaining is divided by 1 min (60s)

  useEffect(function(){
   const id = setInterval(function(){
      dispatch({type:'tick'})
      // console.log("tick")
    }, 1000);
    return()=> clearInterval(id);
  },[dispatch]);
  return (
    <div className='timer'> {min < 10 && '0'}{min}: 
    {seconds < 10 && '0'}
    {seconds}
    </div>
  )
}

export default Timer