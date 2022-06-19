import { Provider, providers, signIn, useSession , } from 'next-auth/client';
import React from 'react';
import {useRouter} from "next/router";
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import { data } from 'autoprefixer';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword  } from "firebase/auth";
import "firebase/auth";
import firebase from 'firebase'
import Footer from './Footer';
require('firebase/auth')






const Login = () => {
    
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState(""); 
    
    

    {/*const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

         await router.push('/')
    }*/}


    
    return (
      <div>
        <div className="flex  flex-col items-center justify-center h-full bg-gradient-to-br from-[#03423E] to-[#0FD6C9]  w-full py-16 px-4">
      
      
        <div class="w-full container mx-auto">
          <div class="w-full flex items-center ml-2 ">
          
          <div className='w-[400px] ml-7  '>
              <img  src='images/logo-png-8.png'>
              
              </img>
          </div>
  
           
          </div>
        </div>
  
        
        <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
         
          <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 class="my-4 text-3xl md:text-5xl text-white  font-bold leading-tight text-center md:text-left">
              
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#94fff8] mr-2">
                Tunpaper 
              </span>
              Design within everyone's reach.
            </h1>
            <p class="leading-normal text-bg:white text-white text-base md:text-2xl mb-8 text-center md:text-left">
            Find , create and collaborate with your own documents
            </p>
  
           
              <div class="mb-4">
               
              </div>
  
              <div class="flex items-center justify-between w-full  rounded-lg px-8 pt-6 pb-8 mb-4">
                <button
                onClick={signIn}
                  class=" text-lg font-semibold leading-none animate-bounce   bg-white rounded-lg hover:bg-gray-50 shadow-lg  py-4 w-full"
                  type="button"
                >
                  <span class="bg-clip-text text-transparent text-2xl bg-gradient-to-r from-[#03423E] to-[#0FD6C9] ">
                Take a tour 
              </span> 
              
                </button>
              </div>
             
          
            
          </div>
  
         
          <div class="w-full xl:w-3/5 p-11 overflow-hidden">
            <img class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"  src='images/editor.png' />
          </div>
  
          
        </div>
      </div>
  
      <div>
      <div class="mx-auto md:pt-16 flex flex-col items-center justify-center">
            <p class="text-white font-bold pb-8 lg:pb-6 text-center">
              Download our app:
            </p>
            <div class="flex w-full justify-center fade-in ">
              <img src="images/App Store.svg" class="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
              <img src="images/Play Store.svg" class="h-12 transform hover:scale-125 duration-300 ease-in-out" />
            </div>
          </div>
  
          
          
          <section class="bg-white border-b py-8">
        
      </section>
      
      </div>
      <Footer></Footer>
    </div>
        
    
    )
}

export default Login;
