const { useState } = React
const { useParams , useNavigate } = ReactRouter

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"

export function AddReview({setBook}) { 

    const [reviewToUpdate,setReviewToUpdate] = useState(bookService.getEmptyReview())

    const params = useParams()
    const navigator = useNavigate()

    function handleChange({ target }){
        let {value, name: field, type} = target
        if (type === 'number') value = +value
        setReviewToUpdate((prevReviewToUpdate) => ({...prevReviewToUpdate, [field]:value}))
    }

    function onSubmitBook(ev){
        ev.preventDefault()
        bookService.addReview(params.bookId,reviewToUpdate)
            .then((book) => {
                console.log('book from add review',book);
                showSuccessMsg('Review Added')
                setBook(book)
            })
            .catch((err) => {
                console.log('failed adding review',err);
                showErrorMsg('Adding review failed brother')
            })
    }

    return <section className="add-book">
    <form onSubmit={(ev) => onSubmitBook(ev)}>
        <label htmlFor="add-review-full-name">Full name</label>
            <input 
            type="text" 
            name="fullName" 
            id="add-review-full-name" 
            value={reviewToUpdate.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
        />        
        <label htmlFor="add-review-free-text">Free text </label>
            <input 
            type="text" 
            name="freeText" 
            id="add-review-free-text" 
            value={reviewToUpdate.freeText}
            onChange={handleChange}
            placeholder="Enter free text"
        />        
        <label htmlFor="add-review-rating">Rate</label>
        <input 
        type="number" 
        name="rate" 
        id="add-review-rating" 
        value={reviewToUpdate.rate}
        onChange={handleChange}
        placeholder="Enter Rate"
        />
        <label htmlFor="add-review-read-at">Read at</label>
        <input 
        type="date" 
        name="readAt" 
        id="add-review-read-at" 
        value={reviewToUpdate.readAt}
        onChange={handleChange}
        placeholder="Enter read date"
        />
        <button>Submit</button>
</form>
</section>
}