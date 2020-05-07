import React from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {

    state = {

        result: {}, // {[id]: success or error}

        isFinished: false,

        activeQuestion: 0,

        answerState: null,

        quiz: [
            {
                question: 'Какого цвета небо',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'зеленый', id: 4}
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId) // При нажатии на пункт, срабатывает функция которая выдает answerId (это id правильного ответа)

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0] // непонятная хрень
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]

        const results = this.state.result

        if (question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results

            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)  // Для того чтобы не было утечки памяти и таймаут убрался сразу после выполнения функции

            }, 1000)


        } else {

            results[question.id] = 'error'

            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })

        }



    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            result: {}, // {[id]: success or error}

            isFinished: false,

            activeQuestion: 0,

            answerState: null,

        })
    };

    render() {
        return (
            <div className="quis">
                <div className="quiz-wrapper">
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                            ?
                            <FinishedQuiz
                                results={this.state.result}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz