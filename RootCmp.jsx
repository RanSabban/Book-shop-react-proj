const {useState} = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {
    return <Router>
        <section className="app main-layout">
        < AppHeader/>
        <main className="full main-layout">
        <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="/about" element = {<AboutUs />}/>


            <Route path="/books" element = {<BookIndex />}/>
            <Route path="/books/edit" element = {<BookEdit />}/>
            <Route path="/books/edit/:bookId" element = {<BookEdit />}/>
            <Route path="/books/:bookId" element = {<BookDetails />}/>
        </Routes>
        </main>
        <UserMsg />
    </section>
    
    </Router>
}