import React,{useState} from 'react'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const[showPassword,setShowPassword]=useState(true);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    function notify(status){
        if(status==200){
            toast.success('Sign Up SuccessFully');
            navigate('/login');
            setLoading(false);
        }
        else if(status==404){
            toast.warning('User Already Found,try Again');
            setLoading(false);
        }
        else{
            toast.error("Can't Sign Up Try Again");
            setLoading(false);
        }
    }
    async function signingUp(){
        await axios({
            url:"http://localhost:8010/signUp",
            method:"POST",
            data:{email:document.getElementById("email").value,password:document.getElementById("password").value}
        }).then((res)=>notify(res.status)).catch(err=>{try{(err.response==undefined)?notify(500):notify(err.response.status)}catch(err){notify(500)}});
    }
  return (
    <div className="loginform">
        <div className="form">
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <h1 className="logo1">AspireNex</h1>
                <h2 style={{color:'grey',marginLeft:'30px'}}>SignUp</h2>
            </div>
            <h3 style={{color:'#282828'}}>Enter Email</h3>
            <input type="email" placeholder="Enter your Name" id="email"/>
            <h3 style={{color:'#282828'}}>Enter your Password</h3>
            <input type={(showPassword)?"password":'text'} id="password" />
            <p className="showPassword" onClick={()=>setShowPassword(!showPassword)}>showpassword</p>
            <div className="content1">
                <button type="button" className="button" onClick={()=>{signingUp();setLoading(true)}}>SignUp&nbsp;{(loading)?<i class="fa-solid fa-spinner loading"></i>:""}</button>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default SignUp;
