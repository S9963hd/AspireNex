import React,{useState} from 'react';
import './Join.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Join = () => {
  const [quizzDetails,setQuizzDetails]=useState([]);
  const[quizzId,setQuizzId]=useState('');
  const[index,setIndex]=useState(0);
  const[userAnswser,setUserAnswer]=useState([]);
  const[userResult,setUserResult]=useState(null);
  function notify(status){
    console.log(status);
    if(status==200){
        toast.success("You're Joined");
    }
    else if(status==404){
      toast.info("No data Found Create New one");
    }
    else{
        toast.error("Server Error Try again");
    }
}
  let resulting=async()=>{
    axios({
      method:"POST",
      url:"https://aspirenexbackendmain.onrender.com/results",
      data:{result:userAnswser,quizzId:quizzId}
    }).then(res=>{setUserResult(res.data.result);console.log(userResult)}).catch(err=>console.log(err));
  }
  let fetching=async ()=>{
    console.log(quizzId);
    await axios({
      url:"https://aspirenexbackendmain.onrender.com/fetchQuizz",
      method:"POST",
      data:{"quizzId":quizzId}
    }).then(res=>{setQuizzDetails([...res.data]);notify(res.status)}).catch(err=>{try{console.log(err,"Data Error\n\n");notify(err.response.status)}catch(err){notify(500)}});
  }
  return (
    (userResult!=null)?<ResultModel result={userResult} n={userAnswser.length}/>:<div hidden={(userResult!=null)}>
      <div style={{width:'100%',height:'5px'}}>
        <div className="progressBar" style={{backgroundColor:'#FF7418',width:`${((index*100)/quizzDetails.length-1)}%`,height:'100%'}}></div>
      </div>
      <button className="button" style={{position:'absolute',top:'10px',right:'10px',margin:'20px'}} onClick={()=> resulting()}>Submit</button>
      {(quizzDetails.length==0)?<Model fetching={fetching} quizzId={quizzId} setquizzId={setQuizzId} />:<QuestionPlatform ques={quizzDetails[index]} index={index} setIndex={setIndex} n={quizzDetails.length} userAnswer={userAnswser} setUserAnswer={setUserAnswer}/>}
      {console.log(quizzDetails)}
      <ToastContainer />
      
      {console.log(userAnswser)}
    </div>
  )
}
function Model({setquizzId,fetching}){
  return(
    <div className="Model">
      <div className="ModelBox">
        <h2>Enter the Quizz Name</h2>
        <input type="text" placeholder='' id="quizzId" onChange={(e)=>setquizzId(e.target.value)}/>
        <button type="button" className="button" onClick={()=>fetching()}>Join Now</button> 
      </div>
    </div>
  )
}
function QuestionPlatform({ ques, index, setIndex, n, userAnswer, setUserAnswer }) {
  const handleAnswerChange = (option) => {
    const updatedAnswers = [...userAnswer];
    const questionIndex = index; // Use the current index as the key for each question's answers

    // Ensuring the userAnswer array has enough space for all questions
    if (!updatedAnswers[questionIndex]) {
      updatedAnswers[questionIndex] = [];
    }

    // Check if the option is already selected
    if (updatedAnswers[questionIndex].includes(option)) {
      // If selected, remove it
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(item => item !== option);
    } else {
      // If not selected, add it
      updatedAnswers[questionIndex].push(option);
    }

    setUserAnswer(updatedAnswers);
  };

  return (
    <div className="question">
      {console.log(ques)}
      <div className="questionBox">
        <h4>{ques.QuizzQuestion}</h4>
        {ques.QuizzOptions.map((e, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="checkbox"
              value={e}
              checked={userAnswer[index] ? userAnswer[index].includes(e) : false}
              onChange={() => handleAnswerChange(e)}
              style={{ minWidth: '40px' }}
            />
            <span>{e}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <button className="button" onClick={() => setIndex(index - 1)} disabled={index === 0}>Prev</button>
          <button className="button" onClick={() => setIndex(index + 1)} disabled={index === n - 1}>Next</button>
        </div>
      </div>
    </div>
  )
}
function ResultModel({result,n}){
  const navigate=useNavigate();
  return(
    <div className="Model">
      <div className="ModelBox">
        <h1>You're Results</h1>
        <h2>{result} out of {n}</h2>
        <h4>Thanks for taking this test</h4>
        <button className="button" onClick={()=>navigate('/')}>Finish Test</button>
      </div>
    </div>
  )
}
export default Join;
