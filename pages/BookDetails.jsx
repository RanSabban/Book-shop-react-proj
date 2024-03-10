export function BookDetails({book,onGoBack}){
    return <section className="book-details">
        <button onClick={onGoBack}>Back</button>
        <h1>Book Title: {book.title}</h1>
        <h5>Book Price: {book.price}</h5>
        <h2>Description:</h2>
        <p>{book.description}</p>
    </section>
}