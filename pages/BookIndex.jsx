const {useState, useEffect} = React

import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"


export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [selectedBook, onSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    },[])

    console.log('books from book index:',books);

    function loadBooks(){
        bookService.query()
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(book){
        console.log(book)
        onSelectedBook(book)
    }


    return <section className="book-index">
    {
        !selectedBook && <React.Fragment>
        <h1>Books List:</h1>
        <BookList books={books} 
        onSelectBook={onSelectBook}
        />
        </React.Fragment>
    }
    {
        selectedBook && <BookDetails
        book={selectedBook}
        onGoBack={() => onSelectedBook(null)}
        />
    }

    </section>
}