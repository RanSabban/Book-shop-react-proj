import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {title: '', price: 0}
_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

// For Debug obly
window.bs = bookService

function query(filterBy = getFilterBy()){
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.price >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY,bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0) {
    return { id: '', title, price }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy (filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length -1) idx = -1
            return books[idx+1].id
        })
}

// Private funcs

function _createBooks(){
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length){
        books = []
        books.push(_createBook())
        books.push(_createBook())
        books.push(_createBook())
        console.log(books);
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title = utilService.makeLorem(5), description = utilService.makeLorem(), thumbnail = utilService.getRandomIntInclusive(1,20), price = utilService.getRandomIntInclusive(50,200)) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    book.description = description
    book.thumbnail = `./assets/img/${thumbnail}.jpg`
    return book
}

