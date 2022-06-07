import React from "react"

export default function Start(props) {
    
    return (
        <div className="start-page">
            <h1>Trivia Game</h1>
            <h2>Test your trivia skills!</h2>
            <button onClick={props.handleClick}>Start quiz</button>
        </div>  
        
    )
}