import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import BookList from "./components/BookList"
import fantasyBooks from "./data/fantasy.json"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNav />
      <Welcome />
      {/* <AllTheBooks /> */}
      <BookList books={fantasyBooks} />
      <MyFooter />
    </div>
  )
}

export default App
