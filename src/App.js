import './App.css';
import {useState,createContext} from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Main from './Main/Main.jsx';
import Login from './LoginAndSignUp/Login.jsx';
import SignUp from './LoginAndSignUp/SignUp.jsx';
import Create from './CreateQuizz/Create.jsx';
import Join from './JoinQuizz/Join.jsx';
export let LoginDetails=createContext();
function App() {
  const[login,setLogin]=useState(null);
  return (
    <LoginDetails.Provider value={{login,setLogin}}>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/create" element={(login)?<Create/>:<ModelBox/>}/>
        <Route path="/join" element={(login)?<Join/>:<ModelBox/>}/>
      </Routes>
    </LoginDetails.Provider>
  );
}
function ModelBox(){
  let navigate=useNavigate();
  return (
    <div className="Model">
      <div className="ModelBox">
        <h1>Login First</h1>
        <button className="button" onClick={()=>navigate('/')}>Ok</button>
      </div>
    </div>
  )
}
export default App;
