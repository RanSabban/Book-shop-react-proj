export function BookPreview({book}){
    function getPriceClass(){
        if (book.listPrice.amount > 150) return 'price-red'
        if (book.listPrice.amount < 20) return 'price-green'
        else return ''
    }
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <h5 className={getPriceClass()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h5>
        <h5 className="page-count">Pages: {book.pageCount}</h5>
        <img src={book.thumbnail}/>
    </article>
}