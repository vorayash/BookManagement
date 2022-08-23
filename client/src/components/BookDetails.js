import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { deleteBookMutation, getBooksQuery, getSelectedBook } from '../queries/queries';

export const BookDetails = ({selected}) => {
    const { loading, error, data } = useQuery(getSelectedBook, 
            { variables: {
                selected: selected }
             } );
             if(selected){
                if(data)
                console.log(data);
             }
    const [deleteBook] = useMutation(deleteBookMutation);

    const displayBook = function(){
        if(loading) return (<p>Loading...</p>)
        if(selected){
            return(
                <div>
                <p>Book Name: {data.book.name} <i className="material-icons" onClick={()=>{
                     deleteBook({
                        variables:{
                            id:data.book.id
                        },refetchQueries: [ getBooksQuery ]
                    })
                }}>delete</i></p>
                <p>Book Genre: {data.book.genre}</p>
                <p>Book Author Name: {data.book.author.name}</p>
                <ul>
                    {
                        data.book.author.books.map(book=>{
                            return (<li key={book.id}>{book.name}</li>)
                        })
                    }
                </ul>
                </div>
            )
        }
    }()
  return (
    <div id="book-details">
       <h2> BookDetails </h2>
       <div> {displayBook}</div>

    </div>
  )
}
