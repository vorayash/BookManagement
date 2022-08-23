import { gql } from '@apollo/client';
import { divide } from 'lodash';

const getAuthorsQuery = gql`
    {
        authors{
            id
            name
        }
    }
`


const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const getSelectedBook = gql`
    query($selected: ID){
        book(id: $selected){
            name
            genre
            id
            author{
                name
                books{
                    name
                    id
                }
            }
        }
    }
`

const addBookMutation = gql`
    mutation($name:String!, $genre: String!, $authorId: ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            genre
            id
        }
    }
`
const deleteBookMutation = gql`
mutation($id: ID!){
    deleteBook(id:$id){
        name
    }
}
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getSelectedBook,deleteBookMutation};