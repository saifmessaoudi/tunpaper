import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import db from '../firebase';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import { Button, IconButton } from '@material-ui/core';
import Header from '../components/HeaderEditor';
import Login from '../components/Login';
import { getSession } from 'next-auth/client';

import DocRow from './DocRow';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor), {
  ssr: false,
})




const TextEditor = ({ doc }) => {
  const [session] = useSession();
  const [docs, setDocs] = useState([]);
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

  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection('userDocs').doc(session?.user.email).collection('docs').doc(id).set({
      editorState: convertToRaw(editorState.getCurrentContent())
    }, {
      merge: true
    })
  }

  useEffect(() => {
    if (doc?.editorState) {
      setEditorState(EditorState.createWithContent(convertFromRaw(doc?.editorState)))
    }
  }, [doc]);

  return (
    
   
    <div>
      <Header/>
      <div className='flex justify-between   '>
      <div>

      <div className={ 'sidebar flex justify-center bottom-0 lg:left-0 pb-[600px] w-[380px] bg-gray-700  text-center'}>
        <div className='text-gray-800 text-xl'>

        <div className="bg-gray-100 text-sm mt-5 rounded-lg hidden md:inline-flex w-[250px] items-center  text-gray-500 focus-within:text-gray-600 focus-within:shadow-lg focus-within:placeholder-current ">
            <IconButton>
              <SearchIcon/>
            </IconButton>
            <input type="text" placeholder='Find your template here'  className="flex-grow outline-none bg-transparent " />
          </div>

        <div className="grid w-[250px]  pb-5 pl-[5  px]  pt-[30px] grid-cols-2 gap-x-[80px]   ">
      {docs?.map(doc => (
            <DocRow
              key={doc.id}
              doc={doc}
            />
          ))}

      </div>
         

        </div>

  </div>

    </div>
    <div className='bg-gray-200 sticky ' >
    <Editor
      editorState={editorState}
      toolbarClassName="  top-5 z-50  mx-auto "
      editorClassName="bg-white shadow-lg max-w-5xl mx-auto border p-10 min-h-screen my-6"
      onEditorStateChange={onEditorStateChange}
    />
    </div>


    </div>

      </div>
      
  );
}

export default TextEditor;
