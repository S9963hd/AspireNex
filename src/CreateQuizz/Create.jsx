import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Create.css';
import { LoginDetails } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const [questions, setQuestions] = useState(1);
    const [ques, setQues] = useState([]);
    const [quizzname, setQuizzName] = useState('');
    const { login } = useContext(LoginDetails);
    const [loading,setLoading]=useState(false);
    function notify(status) {
        if (status === 200) {
            toast.success('Quiz Added Successfully\nRemember! Your data will be erased after 6 hours');
            setLoading(false);
        }
        else if (status === 404) {
            toast.warning('Quiz ID Already Found, Try Different');
            setLoading(false);
        } 
        else {
            toast.error("Can't Add, Try Again");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (questions > ques.length) {
            setQues([...ques, ...Array(questions - ques.length).fill({ QuizzQuestion: '', QuizzOptions: ['', '', '', ''], QuizzAnswer: [] })]);
        } else if (questions < ques.length) {
            setQues(ques.slice(0, questions));
        }
    }, [questions]);

    const sendQuizzDetails = () => {
        axios({
            url: "https://aspirenexbackendmain.onrender.com/getQuizz",
            method: "POST",
            data: { quizzId: quizzname, email: login.email, ques: ques }
        })
            .then(res => { 
                console.log("Data is Saved", res); 
                notify(res.status); 
            })
            .catch(err => {
                console.log("Error: ", err);
                if (err.response) {
                    notify(err.response.status);
                } else {
                    notify(500);
                }
            });
    };

    const handleQuestionChange = (index, newQuestion) => {
        const updatedQues = [...ques];
        updatedQues[index].QuizzQuestion = newQuestion;
        setQues(updatedQues);
    };

    const handleOptionsChange = (questionIndex, optionIndex, newOption) => {
        const updatedQues = [...ques];
        updatedQues[questionIndex].QuizzOptions[optionIndex] = newOption;
        setQues(updatedQues);
    };

    const handleAnswerCheckboxChange = (questionIndex, optionValue) => {
        const updatedQues = [...ques];
        const answers = updatedQues[questionIndex].QuizzAnswer;
        if (answers.includes(optionValue)) {
            updatedQues[questionIndex].QuizzAnswer = answers.filter(answer => answer !== optionValue);
        } else {
            updatedQues[questionIndex].QuizzAnswer = [...answers, optionValue];
        }
        setQues(updatedQues);
    };

    const quizzQuestions = () => {
        return ques.map((question, index) => (
            <Question
                key={index}
                index={index}
                question={question}
                handleQuestionChange={handleQuestionChange}
                handleOptionsChange={handleOptionsChange}
                handleAnswerCheckboxChange={handleAnswerCheckboxChange}
            />
        ));
    };

    return (
        <div id="createMain" className="createForm">
            <a href="#createMain" className="home-icon fa-solid fa-arrow-up"></a>
            <div>
                {console.log(ques)}
                <h2>Number of Questions</h2>
                <div className="noOfQuestion">
                    <input
                        type="number"
                        onChange={(e) => setQuestions(Number(e.target.value))}
                        min={1}
                        max={10}
                        required
                    />
                    <button type="button" className="button" style={{ justifySelf: 'center' }} onClick={()=>{setLoading(true);sendQuizzDetails()}}>Submit&nbsp;{(loading)?<i class="fa-solid fa-spinner loading"></i>:""}</button>
                </div>
                <div className="noOfQuestion1">
                    <h2>Set Quiz Name</h2>
                    <input type="text" onChange={(e) => setQuizzName(e.target.value)} />
                </div>
                {quizzQuestions()}
            </div>
            <ToastContainer />
        </div>
    );
};

const ShowOptions = ({ questionIndex, optionIndex, optionValue, handleOptionsChange, handleAnswerCheckboxChange, isChecked }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="formCheck">
                <input
                    type="checkbox"
                    id={`option-${optionIndex}-${questionIndex}`}
                    checked={isChecked}
                    onChange={() => handleAnswerCheckboxChange(questionIndex, optionValue)}
                    style={{ minWidth: '50px' }}
                />
                <input
                    type="text"
{/*                     value={optionValue} */}
                    onChange={(e) => handleOptionsChange(questionIndex, optionIndex, e.target.value)}
                    style={{ minWidth: '100%', maxWidth: '100%', alignSelf: 'center', justifySelf: 'center' }}
                />
            </div>
        </div>
    );
};

const Question = ({ index, question, handleQuestionChange, handleOptionsChange, handleAnswerCheckboxChange }) => {
    const [options, setOptions] = useState(question.QuizzOptions.length);

    useEffect(() => {
        if (options > question.QuizzOptions.length) {
            handleOptionsChange(index, options - 1, '');
        } else if (options < question.QuizzOptions.length) {
            handleOptionsChange(index, options, '');
        }
    }, [options]);

    const optionList = () => {
        return question.QuizzOptions.slice(0, options).map((optionValue, optionIndex) => (
            <ShowOptions
                key={`${index}-${optionIndex}`}
                questionIndex={index}
                optionIndex={optionIndex}
                optionValue={optionValue}
                handleOptionsChange={handleOptionsChange}
                handleAnswerCheckboxChange={handleAnswerCheckboxChange}
                isChecked={question.QuizzAnswer.includes(optionValue)}
            />
        ));
    };

    return (
        <form className="eachQuestion">
            <h2>Enter the Question</h2>
            <input
                type="text"
                placeholder="Enter the Question"
                title="Enter Question"
{/*                 value={question.QuizzQuestion} */}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <h2>Enter the Number of Options</h2>
            <p>&#x28;Max 4&#x29;</p>
            <button
                type="button"
                disabled={options === 4}
                onClick={() => setOptions(options + 1)}
                className="button1 fa-solid fa-plus"
            ></button>
            <button
                type="button"
                disabled={options === 1}
                onClick={() => setOptions(options - 1)}
                className="button1 fa-solid fa-minus"
            ></button>
            {optionList()}
        </form>
    );
};

export default Create;
