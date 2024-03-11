const {useEffect,useState} = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import { RenderReviews } from "../cmps/RenderReviews.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookDetails(){
    const [book,setBook] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadBook()
    },[params.bookId])

    function loadBook(){
        setIsLoading(true)
        bookService.get(params.bookId)
        .then(book => setBook(book))
        .catch(err => {
            console.log('error with load car details', err)
            navigate('/books')
        })
        .finally(() => {
            setIsLoading(false)
        })
        
    }

    function onRemoveReview(reviewId){
        const review = book.review.filter(review => review.id !== reviewId)
        book.review = review
        bookService.save(book)
            .then(book => {
                showSuccessMsg('Review removed')
                console.log('Review removed, new book:', book);
                return book
            })
        .then((book) => {
            setBook(book)
            loadBook()
        })
    }

    function getPageCount(){
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    function getPublishDate(){
        if (book.publishedDate < 2014) return '- Vintage'
        if (book.publishedDate > 2023) return '- New'
    }

    function getPriceClass(){
        if (book.listPrice.amount > 150) return 'price-red'
        if (book.listPrice.amount < 20) return 'price-green'
        else return ''
    }

    function getOnSale(){
        return <div className="on-sale-container">
            Last Price: <span className="deleted-price">{book.listPrice.amount+book.listPrice.currencyCode}</span>
            <span> New Price: {Math.trunc(book.listPrice.amount*.9)+book.listPrice.currencyCode}</span>
            <img src={"./assets/img/onsale-sign.svg"}/>
            </div>
    }

    if (isLoading) return <div>Loading..... brother.</div>

    return <section className="book-details">
        <Link to="/books"><button>Back</button></Link>
        <h1>Book Title: {book.title}</h1>
        <h3>{book.subtitle}</h3>
        <h5 className={getPriceClass()}>{book.listPrice.isOnSale ? getOnSale() : book.listPrice.amount+book.listPrice.currencyCode}</h5>
        <h2>Description:</h2>
        <LongTxt txt={book.description} length={20} />
        <h2>Authors: {book.authors.map(author => author + ' ')}</h2>
        <h2>Book categories: {book.categories.map(category => category + ' ')}</h2>
        <h2>LNG: {book.language}</h2>
        <h3>Pages: {book.pageCount}<span> {getPageCount()}</span></h3>
        <h3>Published Date {book.publishedDate} <span>{getPublishDate()}</span></h3>
        <img src={book.thumbnail}/>
        { (book.review) && <section className="render-reviews">
            <h1>Reviews:</h1>
            <ul className="clean-list">
        {
            book.review.map(review => {
                return <li key={review.id} className="book-review-card">
                    <div>
                        Name: {review.fullName} <br />
                        Full review: {review.freeText} <br />
                        Read at: {review.readAt} <br />
                        Rating: {review.rate}
                        <button onClick={() => onRemoveReview(review.id)}>Delete</button>
                    </div>
                </li> 
            })
        }
            </ul>
        </section>
       
        }
        {
            (!book.review) && <section className="no-reviews">
                <h1>No reviews yet</h1> 
            </section>
        }
        <AddReview setBook={setBook}/>
    </section>
}