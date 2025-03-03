import React,{useState,useContext} from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {LoginDetails} from '../App';
import './Login.css';
import axios  from 'axios';


const Login = () => {
    const navigate=useNavigate();
    const[showPassword,setShowPassword]=useState(true);
    const {login,setLogin}=useContext(LoginDetails);
    const[loading,setLoading]=useState(false);
    const[email,setEmail]=useState('');
    const[floading,setFloading]=useState(false);
     function retrivepassword(email){
         console.log("Sending.....")
        axios({
            url:"https://aspirenexlogin.onrender.com/forgot",
            method:"POST",
            data:{email:email},
        }).then(res=>{console.log("Sended Successfully.....");notify(res.status)}).catch(err=>{console.log("Somthing Wrong");(err.response.status!=undefined)?notify(err.response.status):notify(404)});
    }
    function notify(status){
        if(status==200){
            toast.success('Login SuccessFully');
            navigate('/');
            setLoading(false);
        }
        else if(status==201){
            toast.success("Check you're Gmail");
            setLoading(false);
            setFloading(false);
        }
        else if(status==401){
            toast.error("Gmail Not found");
            setLoading(false);
            setFloading(false);
        }
        else{
            toast.error("Can't Sign Up Try Again");
            setLoading(false);
        }
    }
    function loggingIn(){
        axios({
            url:"https://aspirenexlogin.onrender.com/login",
            method:"POST",
            data:{email:document.getElementById("email").value,password:document.getElementById("password").value}
        }).then(async res=>{await setLogin(res.data);notify(res.status)}).catch(err=>{try{console.log(err,"Loggin Error");notify(err.response.status)}catch(err){notify(500)}});
}
  return (
    <div className="loginform">
        <div action="" method="" className="form" >
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <h1 className="logo1">AspireNex</h1>
                <h2 style={{color:'grey'}}>Login</h2>
            </div>
            <h3 style={{color:'#282828'}} >Enter Email</h3>
            <input type="email" id="email" placeholder="Enter your Name" onChange={(e)=>setEmail(e.target.value)}/>
            <h3 style={{color:'#282828'}}>Enter your Password</h3>
            <input type={(showPassword)?"password":'text'} id="password" />
            <p className="showPassword" onClick={()=>setShowPassword(!showPassword)}>showpassword</p>
            <p className="showPassword" onClick={()=>{retrivepassword(email);setFloading(true)}}>forgotpassword?&nbsp;{(floading)?<p class="fa-solid fa-spinner loading"></p>:""}</p>
            <div className="content1">
                <button type="button" className="button" style={{marginRight:'10px'}} onClick={()=>{loggingIn();setLoading(true)}}>Login&nbsp;{(loading)?<i class="fa-solid fa-spinner loading"></i>:""}</button>
                <button type="button" className="button" onClick={()=>navigate('/signup')}>SignUp</button>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login;
