let books = []; 

const addBook = (book) => {
    books.push(book); 
};

const getAllBooks = () => {
    return books; 
};


const getBookById = (id) => {
    return books.find((book) => book.id === id); 
};


const updateBookById = (id, updatedBook) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook }; 
        return true; 
    }
    return false; 
};


const deleteBookById = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1); 
        return true; 
    }
    return false; 
};


export { books, addBook, getAllBooks, getBookById, updateBookById, deleteBookById}; 
