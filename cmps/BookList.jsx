import { BookPreview } from "./BookPreview.jsx"

export function BookList({books,onSelectBook}){

    if (!books) return <div>LOADING</div>
    return <ul className="book-list clean-list">
        {
        books.map(book => 
            <li key={book.id} className="book-card">
                <div className="book-card-text">
                <BookPreview book={book}/>
                </div>
                <div className="book-actions">
                    <button onClick={() => {onSelectBook(book)}}>Book Details</button>
                </div>
            </li>
        )
        }
    </ul>
}