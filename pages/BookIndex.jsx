const {useState, useEffect} = React

import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"


export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [selectedBook, onSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        loadBooks()
    },[filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(book){
        onSelectedBook(book)
    }

    function onSetFilter(fieldsToFilterBy){
        setFilterBy(prevFilter => ({...prevFilter, ...fieldsToFilterBy}))
    }

    return <section className="book-index">
    {
        !selectedBook && <React.Fragment>
            <BookFilter 
            onSetFilter={onSetFilter}
            filterBy = {filterBy}
            />
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