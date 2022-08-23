import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries";
import { BookDetails } from "./BookDetails";

function BookList () {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected,setSelected] = useState(null)
    const displayBooks = (function(){
        if (loading) return <div>Loading...</div>
        if (error) return `Error! ${error.message}`;
        return data.books.map( book =>{
            return ( <li key={book.id} onClick={()=>setSelected(book.id)}> {book.name} </li> )
        })
    })();
    
  return (
    <div>
        <ul id="book-list">
            {displayBooks}
        </ul>
        <BookDetails selected={selected}/>
      </div>
    
  )
}

export default BookList;
