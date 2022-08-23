import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries';

export default function AddBook(){
    const [name,setName] = useState('') 
    const [genre,setGenre] = useState('') 
    const [authorId,setAuthorId] = useState('') 
    const { loading, error, data } = useQuery(getAuthorsQuery);
        const [addBook] = useMutation(addBookMutation);

    const displayAuthor = (function(){
        if(loading) return (<option value="loading" disabled>Loading...</option>)
        // if(error) return (<option selected disabled>{error}</option>)
        if(data) {
            return data.authors.map((author)=>{
                return (<option value={author.id} key={author.id}>{author.name}</option>)
            })
        }
    })()
    const addBookSubmit = (e)=>{
        e.preventDefault();
        addBook({
            variables:{
                name: name,
                genre: genre,
                authorId: authorId
            },refetchQueries: [ getBooksQuery ]
        })

    }
  return (
    <div>
        <form id="add-book" onSubmit={addBookSubmit}>
            <div className='field1'>
            <div className='field'>
                <label>Book Name</label>
                <input id="bookName" type="text" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Genre</label>
                <input id="genre" type="text" onChange={(e)=>setGenre(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Author</label>
                <select defaultValue="loading" id="author" onChange={(e)=>setAuthorId(e.target.value)}>
                    <option disabled>Select Author</option>
                    {displayAuthor}
                </select>
            </div>
           
            
                <button type='submit'>+</button>
            </div>
        </form>
    </div>
  )
}

