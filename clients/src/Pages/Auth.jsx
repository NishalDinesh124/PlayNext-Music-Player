import React, { useState } from "react";
import styled from "styled-components";
import { loginRoute, registerRoute } from "../Utils/APIRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  //States
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // validating register input fields

    const handleRegisterValidation = () => {
    if (userName === "") {
      toast.error("Username required");
      return false;
    } else if (password === "") {
      toast.error("Password required")
      return false;
    } else if(email === ""){
      toast.error("Email required");
      return false;
    }else{
      return true
    }
  }
// validating login input fields
   const handleLoginValidation = () => {
    if (password === "") {
      toast.error("Password required");
      return false;
    } else if(email === ""){
      toast.error("Email required");
      return false;
    }else{
      return true;
    }
  }

  //Handling user Registeration
const handleRegister =async (e)=>{
  e.preventDefault();
  console.log("Register call");
  
  try{
    if(confirmPassword !== password){
      toast.error("Password mismatch");
      return;
    }  
    if(handleRegisterValidation()){
      console.log("Working");
      
const res =await axios.post(registerRoute,{
    username : userName,
    email,
    password
  })
  console.log(res);
    if (res.data.status === false) {
        toast.error(res.data.msg);
      }
      if (res.data.status === true) {
        toast.success("Login successfull");
        localStorage.setItem('playnext-user', JSON.stringify(res.data.user))
        navigate('/');
      }
    }

  }catch(err){
    console.log("An error occured");
    alert(err);
  }
  
}

// handling user login
const handleLogin =async (e)=>{
  e.preventDefault();
  try{
    if(handleLoginValidation()){
const data =await axios.post(loginRoute,{
    email,
    password
  })
  console.log(data);
  
    if (data.data.status === false) {
        toast.error(data.data.msg);
      }
      if (data.data.status === true) {
        toast.success("Login successfull");
        localStorage.setItem('playnext-user', JSON.stringify(data.data.user))
        navigate('/');
      }
    }

  }catch(err){
    console.log("An error occured");
    alert(err);
  }
}
  return (
    <FormContainer>
      <FormWrapper isLogin={isLogin}>
        {/* Login Form */}
        <AuthForm>
          <h2>Login</h2>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" />
          <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer", color: "#007bff" }}>
              Register
            </span>
          </p>
        </AuthForm>

        {/* Register Form */}
        <AuthForm>
          <h2>Register</h2>
          <input onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username" />
          <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" />
          <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
          <input onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder="Confirm Password" />
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)} style={{ cursor: "pointer", color: "#007bff" }}>
              Login
            </span>
          </p>
        </AuthForm>
      </FormWrapper>
    </FormContainer>
  );
}

const FormContainer = styled.div`
color: #ffff;
  position: relative;
  width: 360px;
  height: 460px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: -18px -20px 24px rgb(22 74 165 / 25%), -1px -8px 6px rgba(0, 0, 0, 0.1);
 background-color: #202333;
  @media only screen and (max-height: 490px) {
        height: 100vh;
    }
`;

const FormWrapper = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => (props.isLogin ? "translateX(0)" : "translateX(-50%)")};
`;

const AuthForm = styled.form`
  flex: 0 0 50%;
  height: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  input {
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 6px;
    border: 2px solid #7B4DF7;
    font-size: 14px;
  }

  button {
    padding: 12px;
    border-radius: 6px;
    background-color: #7B4DF7;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #9d7afb;
  }
`;
