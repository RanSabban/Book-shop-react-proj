const {useState, useEffect} = React

import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"


export function BookIndex(){
    const [books, setBooks] = useState(null)

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


    return <section className="book-index">

        <h1>Books List:</h1>
        <BookList books={books} />
    </section>
}