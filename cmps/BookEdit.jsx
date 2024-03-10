import { AddBookModal } from "./AddBookModal.jsx"

const { useState } = React

export function BookEdit({addBook}){
    const [isModalOpen,setModalOpen] = useState(false)
    // const [isSubmitted,onSbumitBook] = useState(false)
    function onSubmit(newBook){
        console.log('hello from book edit',newBook);
        addBook(newBook)
    }
    return <section className="book-edit">
        <button className="book-edit" onClick={()=>setModalOpen(prevIsModalOpen => !prevIsModalOpen)}>Add Book</button>
        {
            isModalOpen && <AddBookModal onSubmit={onSubmit} />
        }
    </section>
}