const {useEffect,useState} = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import { RenderReviews } from "../cmps/RenderReviews.jsx"

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
        <RenderReviews reviews = {book.review} />
        <AddReview setBook={setBook}/>
    </section>
}