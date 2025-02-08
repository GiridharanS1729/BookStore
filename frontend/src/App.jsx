import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, BookOpen } from "lucide-react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const url = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${url}/books`);
      setBooks(res.data);
    } catch (error) {
      setError("Failed to fetch books. Please try again later.");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book) => {
    try {
      setError(null);
      const res = await axios.post(`${url}/books`, book);
      setBooks([...books, res.data]);
      return true; // Success indicator for the form
    } catch (error) {
      setError("Failed to add book. Please try again.");
      console.error("Error adding book:", error);
      throw error; // Propagate error to the form
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      setError(null);
      const res = await axios.put(`${url}/books/${id}`, updatedBook);
      setBooks(books.map((book) => (book._id === id ? res.data : book)));
      return true;
    } catch (error) {
      setError("Failed to update book. Please try again.");
      console.error("Error updating book:", error);
      throw error;
    }
  };

  const deleteBook = async (id) => {
    try {
      setError(null);
      await axios.delete(`${url}/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      setError("Failed to delete book. Please try again.");
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <br />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Book Collection
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal library with ease
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="space-y-8">
          <BookForm addBook={addBook} />
          <br />

          {loading ? (
            <div className="text-center p-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Loading your books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-300">
                No books in your collection yet. Add your first book above!
              </p>
            </div>
          ) : (
            <BookList
              books={books}
              updateBook={updateBook}
              deleteBook={deleteBook}
            />
          )}
        </div>
        <br />
      </div>
    </div>
  );
}

export default App;