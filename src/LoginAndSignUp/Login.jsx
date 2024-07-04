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
    function retrivepassword(email){
        axios({
            url:"https://aspirenexlogin.onrender.com/forgot",
            method:"POST",
            data:{email:email},
        }).then(res=>{sendEmail(email,res.data.password);notify(201)}).catch(err=>{console.log("Something Wrong");notify(err.response.status)});
    }

const sendEmail = async ( email,password) => {
    emailjs.init("9iY9SjsWlSQiP-Huk");
    const userId = '9iY9SjsWlSQiP-Huk';
    const serviceID = 'service_dr4pjjf';
    const templateID = 'template_1mbn28y';
    const accessToken = '13hGuhoCY_JOSCAuzf3wi';

    const templateParams = {
        to_name: 'User',
        from_name: 'Sanjay',
        message: `The Password is: ${password}`,
        to_email: email,
        from_email: 'sanjaysoman46@gmail.com'
    };

     emailjs.send(serviceID, templateID, params, accessToken)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again.');
        });
};

    
    function notify(status){
        if(status==200){
            toast.success('Login SuccessFully');
            navigate('/');
            setLoading(false);
        }
        else if(status==201){
            toast.success("Check you're Gmail");
            setLoading(false);
        }
        else if(status==401){
            toast.error("Gmail Not found");
            setLoading(false);
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
            <p className="showPassword" onClick={()=>retrivepassword(email)}>forgotpassword?</p>
            <div className="content1">
                <button type="button" className="button" style={{marginRight:'10px'}} onClick={()=>{loggingIn();setLoading(!loading)}}>Login&nbsp;{(loading)?<i class="fa-solid fa-spinner loading"></i>:""}</button>
                <button type="button" className="button" onClick={()=>navigate('/signup')}>SignUp</button>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login;
