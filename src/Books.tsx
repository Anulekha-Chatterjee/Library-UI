import React from "react";
import "./App.css";

interface IProps {}

interface IState {
  response: string;
  title: string;
  author: string;
  responseToPost: string;
  books: [];
  titleError: string;
  authorError: string;
}

class Books extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      response: "",
      title: "",
      author: "",
      responseToPost: "",
      books: [],
      titleError: "",
      authorError: "",
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  validate = () => {
    let titleError = "";
    let authorError = "";
    if (!this.state.title) {
      titleError = "title cannot be blank";
    }

    if (!this.state.author) {
      authorError = "author cannot be blank";
    }

    if (titleError || authorError) {
      this.setState({ titleError, authorError });
      return false;
    }
    return true;
  };

  fetchData = async () => {
    fetch("http://localhost:4000/library/books")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((books) => {
        console.log(books);
        this.setState({ books });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const response = await fetch("http://localhost:4000/library/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.title,
          author: this.state.author,
        }),
      });
      try {
        const body = await response.text();
        this.setState({ responseToPost: body });
        console.log(this.state.responseToPost);
        window.location.reload();
      } catch (e) {
        console.log(e);
        return Promise.reject;
      }
    }
  };

  handleDelete = async (title: any, author: any) => {
    const response = await fetch("http://localhost:4000/library/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    });
    try {
      const body = await response.text();
      this.setState({ responseToPost: body });
      console.log(this.state.responseToPost);
      window.location.reload();
    } catch (e) {
      return Promise.reject;
    }
  };

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <form onSubmit={this.handleSubmit}>
          <p>Enter new book data:</p>

          <input
            className="inputBox"
            value={this.state.title}
            placeholder="Title"
            type="text"
            name="title"
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.titleError}
          </div>

          <input
            className="inputBox"
            value={this.state.author}
            placeholder="Author"
            type="text"
            name="author"
            onChange={(e) => this.setState({ author: e.target.value })}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.authorError}
          </div>

          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </form>

        {/* <p>{this.state.responseToPost}</p> */}
        <p>List of books in the database:</p>
        <table id="books">
          <tr>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>No. of Copies</th>
            <th>Remove a Copy</th>
          </tr>
          {this.state.books.map((book: any, i) => (
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.count}</td>
              <td>
                <button
                  className="btnDelete"
                  type="submit"
                  onClick={this.handleDelete.bind(
                    this,
                    book.title,
                    book.author
                  )}
                >
                  <i className="fa fa-times"> </i>
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default Books;
