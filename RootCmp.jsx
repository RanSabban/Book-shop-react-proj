const {useState} = React

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function App() {
    const [page,setPage] = useState('home')

    console.log('page:',page);
    return <section className="app main-layout">
        < AppHeader setPage = {setPage} />
        <main className="full main-layout">
            {page==='home' && <Home />}
            {page==='about' && <AboutUs />}
            {page==='books' && <BookIndex />}
        </main>
    </section>
}