export function BookPreview({book}){
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <h5>{book.price}</h5>
    </article>
}