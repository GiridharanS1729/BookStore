import React, { useState } from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';

function BookForm({ addBook }) {
    const [form, setForm] = useState({ title: "", author: "", genre: "", read: false });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.author.trim()) newErrors.author = "Author is required";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await addBook(form);
            setForm({ title: "", author: "", genre: "", read: false });
            setErrors({});
        } catch (error) {
            setErrors({ submit: "Failed to add book. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Book</h2>
                </div>

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-600">{errors.submit}</span>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Book Title"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 
                                transition-colors duration-200
                                ${errors.title
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Author Name"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 
                                transition-colors duration-200
                                ${errors.author
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                        {errors.author && (
                            <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            placeholder="Genre (Optional)"
                            className="w-full p-3 border rounded-lg border-gray-300 dark:border-gray-600 
                                bg-gray-50 dark:bg-gray-700 
                                focus:ring-blue-500 focus:border-blue-500
                                transition-colors duration-200"
                        />
                    </div>

                    <label className="flex items-center gap-3 text-gray-700 dark:text-gray-200 cursor-pointer">
                        <input
                            type="checkbox"
                            name="read"
                            checked={form.read}
                            onChange={handleChange}
                            className="w-5 h-5 rounded text-blue-500 border-gray-300 
                                focus:ring-blue-500 transition-colors duration-200"
                        />
                        <span className="text-lg">I have read this book</span>
                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-auto px-6 py-3 text-white font-medium rounded-lg 
                            transition-all duration-200
                            ${isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 active:transform active:scale-95'
                            }`}
                    >
                        {isSubmitting ? 'Adding Book...' : 'Add Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;