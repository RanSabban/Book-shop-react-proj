import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({book,onGoBack}){
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

    return <section className="book-details">
        <button onClick={onGoBack}>Back</button>
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
    </section>
}