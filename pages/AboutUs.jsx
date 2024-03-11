const { Link, Outlet } = ReactRouterDOM


export function AboutUs(){

    return <section className="about-us">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sapiente non iusto, itaque asperiores cupiditate dolorem eos exercitationem quae consequuntur, enim distinctio! Exercitationem molestiae fugiat voluptatibus eveniet voluptate facilis provident, omnis repellendus a voluptatum. Veniam voluptatibus aliquid delectus laborum non nulla, distinctio tempore cum. Tempora aspernatur veniam, optio ea voluptas corporis, voluptatem obcaecati consectetur earum aut qui at quasi rerum iure itaque dicta quam, porro error odio ipsam necessitatibus? Obcaecati in voluptates officiis harum ducimus molestiae optio impedit, provident voluptas, velit voluptatum nulla asperiores non sed sint! Debitis, itaque eveniet nulla cumque ex obcaecati suscipit molestiae? Quisquam eaque autem velit voluptas, nam laboriosam voluptate quis neque nisi libero illum fugiat quibusdam sit cum molestiae, temporibus eius laudantium? Corporis nesciunt rem sapiente aut quaerat ab quos omnis, quam corrupti non. Nulla necessitatibus iure cum voluptate obcaecati! Fugiat corrupti nam quod provident quasi nihil saepe iusto sint rerum tenetur ea voluptate dolor, illo tempore cumque error fugit! Similique enim obcaecati, quia qui modi nisi ducimus dolorem necessitatibus ex, maxime aspernatur consequatur eos quidem illo at earum laborum corrupti fugiat commodi eum quibusdam ratione asperiores. In tenetur dolor consequuntur eligendi aperiam, eius ratione maxime iste, culpa voluptatibus nulla adipisci exercitationem nemo, ducimus laboriosam!</p>

        <nav>
            <Link to="/about/team">Team</Link>
            <Link to="/about/vision">Vision</Link>
        </nav>
        <Outlet/>
    </section>
}