import { BookPreview } from "./BookPreview.jsx"

export function BookList({books,onSelectBook}){

    if (!books) return <div>LOADING</div>
    return <ul className="book-list">
        {
        books.map(book => 
            <li key={book.id}>
                <BookPreview book={book}/>
                <div className="book-actions">
                    <button onClick={() => {onSelectBook(book)}}>Book Details</button>
                </div>
            </li>
        )
        }
    </ul>
}