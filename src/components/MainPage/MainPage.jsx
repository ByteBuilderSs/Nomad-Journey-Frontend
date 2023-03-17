import "./MainPage.css"

function MainPageFunc() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Welcome to my Website</h1>
          <p>Here you can find information about our products and services.</p>
          <button>Learn More</button>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainPageFunc;
