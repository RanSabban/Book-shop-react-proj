const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({books,onRemoveBook}){

    if (!books) return <div>LOADING</div>
    return <ul className="book-list clean-list">
        {
        books.map(book => 
            <li key={book.id} className="book-card">
                <div className="book-card-text">
                <Link to={`/books/${book.id}`}>
                    <BookPreview book={book}/>
                </Link>
                </div>
                <div className="book-actions">
                    <Link to={`/books/edit/${book.id}`}><button>Edit book</button></Link>
                    <button onClick={() => onRemoveBook(book.id)}>Remove book</button>
                </div>
            </li>
        )
        }
    </ul>
}