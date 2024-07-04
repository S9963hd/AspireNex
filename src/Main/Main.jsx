import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { LoginDetails } from '../App';
import './Main.css';
const Main = () => {
  return (
    <div id="main">
        <a href="#main" class="fa-solid fa-house home-icon"></a>
        <Navigation />
        <NavigationMob/>
        <MainContent/>
        <Content1/>
        <Bottom />
    </div>
  )
}
function Navigation(){
    const[followMeOn,setfollowMeOn]=useState(true);
    const {login,setLogin}=useContext(LoginDetails);
    const navigate=useNavigate();
    return(
    <nav className="navigation">
        <div className="navigation1">
        <h1 className="logo">AspireNex</h1>
            <button className="button" onClick={()=>(login)?navigate('/create'):alert("Please Login First")}>Create Quizz</button>
            <button className="button" onClick={()=>(login)?navigate('/join'):alert("Please Login First")}>Join Quizz</button>
            <div>
            <button className="button" onClick={()=>setfollowMeOn(!followMeOn)}>Follow Me on <i class={(followMeOn)?"fa-solid fa-angle-right":"fa-solid fa-angle-down"}></i></button>
            <div className="dropDown" hidden={followMeOn}>
                <h1><a href="https://www.linkedin.com/in/sanjay-s-610913285/"><i className="fa-brands fa-linkedin"></i>&nbsp;Linked-In</a></h1>
                <h1><a href="https://github.com/S9963hd"><i className="fa-brands fa-github"></i>&nbsp;Github</a></h1>
                <h1><a href="mailto:sanjaysoman46@gmail.com"><i className="fa-regular fa-envelope"></i>&nbsp;Email</a></h1>
            </div>
            </div>
        </div>
        <div className="navigation1">
            <a href="https://sanjayweb.vercel.app/"><button className="button">About Me</button></a>
           {(!login)?<button className="button" onClick={()=>navigate('/login')}>SignUp/Login</button>:<button className="button" onClick={()=>setLogin(null)}>Logout</button>}
           {console.log(login)}
        </div>
    </nav>
    )
}
function NavigationMob(){
    const[showOption,setShowOption]=useState(true);
    return(
        <>
        <div className="navigationMob">
            <h1 className="logo">AspireNex</h1>
            <i class="fa-solid fa-bars " style={{color:'#FF7418',fontSize:'large'}} onClick={()=>setShowOption(!showOption)}></i>
        </div>
            <NavigationOptionsMob show={showOption}/>
        </>
    )
}
function NavigationOptionsMob({show}){
    const navigate=useNavigate();
    const {login,setLogin}=useContext(LoginDetails);
    return(
        <div className="optionMob" hidden={show}>
            <div className="option" onClick={()=>navigate('/create')}>Create Quizz</div>
            <div className="option" onClick={()=>navigate('/join')}>Join Quizz</div>
            {(!login)?<div className="option" onClick={()=>navigate('/login')}>SignUp/loginIn</div>:<div className="option" onClick={()=>setLogin(null)}>Logout</div>}
            <a href="https://www.linkedin.com/in/sanjay-s-610913285/" className="option"><i className="fa-brands fa-linkedin"></i>&nbsp;Linked In</a>
            <a href="https://github.com/S9963hd" className="option"><i className="fa-brands fa-github"></i>&nbsp;Github</a>
            <a href="mailto:sanjaysoman46@gmail.com" className="option"><i className="fa-regular fa-envelope"></i>&nbsp;Email</a>
        </div>
    )
}
function MainContent(){
    return(
        <div className="Main1">
            <div>
                <h1 className="Intro">Quizz Software<br/> to Evaluate Yourself</h1>
                <h4>Quizz software for priorities your understanding of a concept</h4>
            </div>
            <img src="/introImg.png" />
        </div>
    )
}
function Content1(){
    return(
        <div className="content1" style={{color:'white'}}>
                <div>
                    <h1>Greater Professionalism Quizz</h1>
                    <h1>With Less Time</h1>
                </div>
                <img src="deadline-fire-running-composition.png" alt="Time"/>
        </div>
    )
}
function Bottom(){
    return (
        <div className="bottom">
            <h1>Create <span style={{color:'#FF7418'}}>You're Exciting Quizz</span> today</h1>
            <h3>We appreciate for you're valuable feedback.<span style={{color:'#FF7418'}}>.</span>.</h3>
        </div>
    )
}
export default Main;
