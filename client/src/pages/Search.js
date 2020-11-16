import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";
import API from "../utils/API";
import Container from "../components/Container";

function Search() {
    // Setting our component's initial state
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("Cemetary Boys");


    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks();
    }, []);

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks(search)
            .then(res => setBooks(res.data.items)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { value } = event.target;
        setSearch(value);
    };


    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (search) {
            loadBooks();
        }
    };

    return (
        <>
            <form className="formRow">
                <Input
                    onChange={() => { }}
                    name="title"
                    placeholder="book search" />
                <FormBtn onClick={handleFormSubmit}> Search </FormBtn>
            </form>

            <Container>
                {books
                    ? books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors}
                            description={book.volumeInfo.description}
                            categories={book.volumeInfo.categories}
                            image={book.volumeInfo.imageLinks.thumbnail} />
                    ))
                    : null}
            </Container>
        </>
    );
}

export default Search;