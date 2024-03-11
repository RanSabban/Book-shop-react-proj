const {useState, useEffect} = React
const { Link } = ReactRouterDOM


import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookIndex(){
    const [books, setBooks] = useState(null)
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

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed succesfully', bookId)
            })
            .catch(err => {
                console.log('Error removing book', err);
                showErrorMsg('Error removing book')
            })
    }

    function onSetFilter(fieldsToFilterBy){
        setFilterBy(prevFilter => ({...prevFilter, ...fieldsToFilterBy}))
    }

    return <section className="book-index">
                <BookFilter 
                onSetFilter={onSetFilter}
                filterBy = {filterBy}/>
                <Link to="/books/edit"><button>Add Book</button></Link>
                <BookList books={books}
                onRemoveBook = {onRemoveBook}
                />
            </section>
}