import Head from 'next/head'
import Header from '../components/Header';
import { useEffect, useState, useRef } from 'react';
import Login from '../components/Login';
import { getSession, providers } from 'next-auth/client';
import { Button, IconButton } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Image from 'next/image';
import ModelRow from '../components/ModelRow';
import db from '../firebase';
import Footer from '../components/Footer';


import DocumentRow from '../components/DocumentRow';
import SearchIcon from '@material-ui/icons/Search';
import { signOut } from 'next-auth/client';
import firebase from 'firebase'
import router, { useRouter } from 'next/router';
require('firebase/auth')


export default function CV({ session,providers  }) {

 
  const [docs, setDocs] = useState([]);
  const [cvModels, setCVModels] = useState([]);
  const [LettreModels, setLettreModels] = useState([]);
  const [ContratModels, setContratModels] = useState([]);
  const [ProfessionnelModels, setProfessionnelModels] = useState([]);

  const router = useRouter();
  
  if (!session) {return <Login></Login>}

   //Professionnel
   const ProfessionnelModelsRef=db
   .collection('Docs')
   .doc('Professionnel')
   .collection('Doc');
 
   useEffect(()=> { 
     const unsub = ProfessionnelModelsRef
     .orderBy('timestamp', 'desc')
     .onSnapshot(querySnapshot => setProfessionnelModels(querySnapshot.docs.map(professionnel => ({id : professionnel.id, ...professionnel.data()}))))
   return unsub
 
   },[])

  //Contrattunisie
  const ContratModelsRef=db
  .collection('Docs')
  .doc('Papiertunisie')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = ContratModelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setContratModels(querySnapshot.docs.map(contrat => ({id : contrat.id, ...contrat.data()}))))
  return unsub

  },[])

  //Lettre
  const LettreModelsRef=db
  .collection('Docs')
  .doc('Lettre')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = LettreModelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setLettreModels(querySnapshot.docs.map(lettre => ({id : lettre.id, ...lettre.data()}))))
  return unsub

  },[])


  //CV
  const CVmodelsRef=db
  .collection('Docs')
  .doc('CV')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = CVmodelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setCVModels(querySnapshot.docs.map(cv => ({id : cv.id, ...cv.data()}))))
  return unsub

  },[])

  //Documents
  const docsRef = db
    .collection('userDocs')
    .doc(session?.user.email)
    .collection('docs');

  useEffect(() => {
    const unsub = docsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))

    return unsub
  }, [])

  
  return (
    <div className="">
      <Head>
        <title>Home - Tunpaper </title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap" rel="stylesheet"></link>
       
      </Head>

      
      <Header />
    
      {/*<div className={ 'sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto bg-white text-center'} onClick={handleSidebar}>
        <div className='text-gray-800 text-xl'>
          <div className='p-2.5 mt-20 flex items-center'>
          <IconButton onClick={signOut}>
            <img src={session?.user.image} className=" rounded-full h-[50px] w-[50px] " alt="" />
          </IconButton>
          </div>
          <hr className='my-2 text-black'></hr>

        </div>

  </div>*/}
      
      <section className="bg-[#F0F3F4] py-20 bg-gradient-to-r from-[#03423E] to-[#0FD6C9]  rounded-[20px]  shadow-xl md:w-3/4 px-4  md:mx-auto m-5 ">
        <div className="max-w-3xl mx-auto">
          
          
          <div className="flex justify-center items-center mb-20">
            <p className='text-white text-4xl font-Noto opacity-90 '>What are you going to create?</p>

            
          </div>
          
         {/* <div className="">

            <div className="">
              <div onClick={() => setShowModal(true)} className="relative h-52 w-40 border cursor-pointer hover:border-blue-700 rounded-md overflow-hidden">
                <Image src={"https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"} layout="fill" />
              </div>
              <p className="ml-2 mt-2 text-sm">Blank</p>
            </div>

  </div>*/}
  
   <div className="col-span-2">
          <div className="bg-gray-100 rounded-lg hidden md:inline-flex w-full items-center space-x-1 text-gray-500 focus-within:text-gray-600 focus-within:shadow-lg focus-within:placeholder-current ">
            <IconButton>
              <SearchIcon/>
            </IconButton>
            <input type="text" placeholder='Find your template here'  className="flex-grow outline-none bg-transparent " />
          </div>
          
        </div>
  


        </div>
      </section>
      
      
      

      
     
      <div className='mx-auto max-w-5xl pt-9 '>
      
          <hr></hr>
      </div> 
      <div className='mx-auto max-w-5xl pt-4  '>
      <div className="flex items-center justify-between pb-5 select-none  text-md">
            <h2 className="font-light flex-grow ">CV</h2>
           
           
          </div>
      </div>
      <div  className="grid w-2/3 ml-[235px] pb-5 pt-1 grid-cols-5 gap-x-[82px] gap-y-6  ">
      
      {cvModels?.map(doc => (
            <ModelRow
              key={doc.id}
              doc={doc}
              
            />
           
      ))}</div>
      <div className='mx-auto max-w-5xl pt-4  '>
     
      </div>
      
       <div className='mx-auto max-w-5xl pt-4  '>
     
      </div>
      
      <div className='mx-auto max-w-5xl pt-4  '>
    
      </div>
    
        <Footer />
     

    </div>
    
  
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  

  return {
    props: {session}
    
  }
}