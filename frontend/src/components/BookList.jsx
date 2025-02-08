import React, { useState } from 'react';
import { Search } from 'lucide-react';

function BookList({ books, updateBook, deleteBook }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", genre: "", read: false });
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (book) => {
    setEditId(book._id);
    setForm(book);
  };

  const handleSave = () => {
    updateBook(editId, form);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ title: "", author: "", genre: "", read: false });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Books ({filteredBooks.length})
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Read</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBooks.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editId === book._id ? (
                      <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-white">{book.title}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editId === book._id ? (
                      <input
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-white">{book.author}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editId === book._id ? (
                      <input
                        value={form.genre}
                        onChange={(e) => setForm({ ...form, genre: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-white">{book.genre}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editId === book._id ? (
                      <input
                        type="checkbox"
                        checked={form.read}
                        onChange={(e) => setForm({ ...form, read: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-lg">{book.read ? "✅" : "❌"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {editId === book._id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded
                              transition-colors duration-200"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded
                              transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(book)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded
                            transition-colors duration-200"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteBook(book._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded
                          transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookList;