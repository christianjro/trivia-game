import './App.css';
import React from "react"
import Start from "./components/Start"
import Questions from "./components/Questions"

export default function App() {
    
    const [started, setStarted] = React.useState(false)
    
    function startQuiz() {
        setStarted(prev => !prev)
    }
    
    return(
        <main>
            {started ? <Questions handleClick = {startQuiz}/> : <Start handleClick = {startQuiz} />}
        </main> 
    )
}
