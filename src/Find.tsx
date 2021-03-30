import React from "react";
import "./App.css";
interface IProps {}

interface IState {
  // title: string;
  // author: string;
  query: string;
  responseToPost: string;
  books: [];
}

class Find extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // title: "",
      // author: "",

      query: "",
      responseToPost: "",
      books: [],
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:4000/library/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // title: this.state.title,
        // author: this.state.author,

        query: this.state.query,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((books) => {
        console.log(books);
        this.setState({ books: books });
        if (this.state.books.length > 0) {
          this.setState({ responseToPost: "Book Found!" });
        } else {
          this.setState({ responseToPost: "Book not found!" });
        }
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Find Books</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Find a book by providing Title or Author Name:</p>
          {/* <input
            className="inputBox"
            value={this.state.title}
            placeholder="Search by Title"
            type="text"
            name="title"
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <text> OR </text> */}
          {/* <input
            className="inputBox"
            value={this.state.author}
            placeholder="Search by Author"
            type="text"
            name="author"
            onChange={(e) => this.setState({ author: e.target.value })}
          /> */}

          <input
            className="inputBox"
            value={this.state.query}
            placeholder="Search by author or title"
            type="text"
            name="author"
            onChange={(e) => this.setState({ query: e.target.value })}
          />
          <br />
          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </form>

        <p>{this.state.responseToPost}</p>
        <table id="books">
          <tr>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>No. of Copies</th>
          </tr>
          {this.state.books.map((book: any, i) => (
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.count}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default Find;
