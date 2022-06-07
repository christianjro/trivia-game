import React from "react"
import {nanoid} from "nanoid"
import Card from "./Card"

export default function Questions(props) {
    const [cardData, setCardData] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [allAnswered, setAllAnswered] = React.useState([])
    const [submitPressed, setSubmitPressed] = React.useState(false)
    
    function callApi() {
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            const value = data.results.map(item => {
                return {
                    id: nanoid(), 
                    isChecked: false,
                    question: item.question,
                    options: shuffle([...item.incorrect_answers, item.correct_answer]),
                    correctAnswer: item.correct_answer,
                    selection: "",
                    accuracy: false,
                }
            })
            setCardData(value)
        })
    }
    
    function shuffle(arr){
        let newArr=[...arr]
        let randomArr=[]
        while(newArr.length>0){
            let randomIndex=Math.floor(Math.random()*newArr.length)
            randomArr.push(newArr[randomIndex])
            newArr.splice(randomIndex,1)
        }
        return randomArr
    }
    
    React.useEffect(() => {
        callApi()
    }, [])
    
    
    const cardElements = cardData.map(item => {
        return (
             <Card 
                 key={item.id}
                 handleClick={recordSelection}
                 {...item}
                 gameOver={gameOver}
             />
        )
    })
    
    function recordSelection(event) {
        const {id, value} = event.target

        setCardData(prevCardData => prevCardData.map(data => (
            data.id === id ? {...data, selection:value} : data
        )))
    }

    function checkAnswers() {
        setSubmitPressed(true)
        setCardData(prevCardData => prevCardData.map(data => {
            data.isChecked = true
            return data.selection === data.correctAnswer ? {...data, accuracy: true} : data
        }))
        
        if(allAnswered < 5) {
            setGameOver(false)
        }
        else{
            setGameOver(true)
        }
    }
    
    
    React.useEffect(() => {
        setAllAnswered( prev => (cardData.filter((item) => {
            return item.selection != ""
        })).length)
        
        setScore( prevScore => (cardData.filter((item) => {
            return item.accuracy === true
        })).length)
        
    }, [cardData])
    

    
    return(
        <div className="questions-page">
            {cardElements}
            <div className="questions-submit"> 
                {(submitPressed && allAnswered < 5) 
                    && 
                    <p>You still still have questions to answer!</p>}
                {(gameOver && allAnswered >4) 
                    && 
                    <p>You scored {score}/5 correct answers</p>}
                {gameOver? 
                    <button onClick={props.handleClick}>Play Again</button> 
                    : 
                    <button onClick={checkAnswers}>Check Answers</button>
                }
            </div>
        </div>
    )
}