import './App.css';
import React, {useState, useEffect} from 'react';
import {interval, Subject, fromEvent, pipe} from 'rxjs'
import {takeUntil, map , buffer, debounceTime, filter} from 'rxjs/operators'

function App() {
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn]= useState(false);


  useEffect(() => {
    const unsubscribe$ = new Subject()
    interval(1000)
      .pipe(takeUntil(unsubscribe$)
      )
      .subscribe(()=>{
        if(timerOn){
          setTime( time => time + 1000)
        }
      })
    return() => {
      unsubscribe$.next();
      unsubscribe$.complete()
    }
  }, [timerOn])

  // const click$ = new Subject();
  // const doubleClick$ = this.click$.pipe(
  //   buffer(
  //     this.click$.pipe(debounceTime(300))
  //   ),
  //   map (list =>{
  //     return list.length
  //   }),
  //   filter(x=> x===2)
  // )


  return (
    <>
      <div>
        <span>{("0" + Math.floor((time/3600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time/60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time/1000) % 60)).slice(-2)}</span>
      </div>
      <button onClick={()=>{
        if(timerOn){
          setTime(0)
          setTimerOn(!timerOn)
        } else {
          setTimerOn(!timerOn)
        }
        }}>
          Start/Stop
        </button>
      <button onDoubleClick={() => setTimerOn(false)}>Wait</button>
      <button onClick={() => {
        setTime(0)
        setTimerOn(true)
      }}>Reset</button>
    </>
  );
}

export default App;
