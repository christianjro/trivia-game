import React from "react"

export default function Card(props) {
    
    function fixText(str) {
        // str = str.replaceAll("&#039;" , "'")
        // str = str.replaceAll("&ndash;" , "_")
        // str = str.replaceAll("&quot;", "'")
        // str = str.replaceAll("&iacute;", "í")
        // str = str.replaceAll("&amp;", "&")
        var s = str
        var he = require('he')
        return he.decode(s)
    }
    
    function buttonStyling(option) {
        
        let backgroundColor = {backgroundColor:"#F5F7FB"}
        if (props.accuracy === true) {
            backgroundColor = option===props.selection ? 
            {backgroundColor:"#94D7A2", borderColor: "#94D7A2"} : 
            {backgroundColor:"#F5F7FB", borderColor: "#4D5B9E", color: "#4D5B9E", opacity: "0.5"}
        }
        else{
            backgroundColor = option===props.selection ? 
            {backgroundColor:"#F8BCBC", borderColor:"#F8BCBC"} : 
            {backgroundColor:"#F5F7FB", borderColor: "#4D5B9E", color: "#4D5B9E", opacity: "0.5"}
        }
        
        return backgroundColor
    }
    

    const answerChoices = props.options.map((option, index) => {
        return(
            
            props.gameOver ?
            <button
                key={index} 
                id={props.id} 
                value={option}
                style={buttonStyling(option)}
            > 
                {decodeURIComponent(fixText(option))}
            </button> 
            
            :
            
            <button 
                key={index} 
                id={props.id} 
                onClick={props.handleClick}
                value={option}
                style={(props.selection===option) ? 
                {backgroundColor:"#D6DBF5", borderColor: "#D6DBF5"}: 
                {backgroundColor:"#F5F7FB"}}
            >
                {decodeURIComponent(fixText(option))}
            </button>
        )
    })
    
    return (
        <div className="question-card">
            <p>{decodeURIComponent(fixText(props.question))}</p>
            <div className="answer-choices">
                {answerChoices}
            </div>
            <span className="horizental-line"></span>
        </div>
    )
}