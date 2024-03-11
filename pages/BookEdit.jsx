const { useState , useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function BookEdit(){
    const [modalInputsToUpdate, setModalInputsToUpdate] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    },[])

    function loadBook(){
        bookService.get(bookId)
            .then(book => setModalInputsToUpdate(book))
            .catch(err => {
                console.log('error finding book',err);
                navigate('/books')
            })
    }

    function onSubmitBook(ev){
        ev.preventDefault()
        
        bookService.save(modalInputsToUpdate)
            .then(savedBook => {
                navigate('/books')
                console.log('book saved',savedBook)
                showSuccessMsg('Book Saved', savedBook.id)
            })
            .catch(err => {
                console.log('error saving book', err)
                showErrorMsg('Error saving book', savedBook.id)
            })
    }

    function handleChange({target}) {
        let {value, name: field, type} = target
        // console.log(value, field, type);
        if (type === 'number') {
            const newValue = +value
            setModalInputsToUpdate((prevModalInputsToUpdate) => ({ ...prevModalInputsToUpdate, listPrice: { ...prevModalInputsToUpdate.listPrice, amount: newValue } }))
        }
        setModalInputsToUpdate((prevModalInputsToUpdate) => ({...prevModalInputsToUpdate, [field]: value}))
    }
    
    console.log(modalInputsToUpdate);

    return <section className="book-edit">
            <form onSubmit={(ev) => onSubmitBook(ev)}>
                <label htmlFor="title-add-booke">Book Title: </label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title-add-book" 
                    value={modalInputsToUpdate.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                />        
                <label htmlFor="subtitle-add-book">Book Subtitle: </label>
                    <input 
                    type="text" 
                    name="subtitle" 
                    id="subtitle-add-booke" 
                    value={modalInputsToUpdate.subtitle}
                    onChange={handleChange}
                    placeholder="Enter book subtitle"
                />        
                <label htmlFor="price-add-book">Price</label>
                <input 
                type="number" 
                name="price" 
                id="price-add-book" 
                value={modalInputsToUpdate.listPrice.amount}
                onChange={handleChange}
                placeholder="Enter book price"
                />
                <button>Submit</button>
        </form>
    </section>
}