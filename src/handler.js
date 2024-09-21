import { nanoid } from 'nanoid';
import { addBook, getAllBooks, getBookById, updateBookById , deleteBookById} from './books.js'; 

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }
    
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const book = {
        id: nanoid(),
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    addBook(book); 
    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: book.id,
        },
    }).code(201);
};

const getBooksHandler = (request, h) => {
    const booksList = getAllBooks();
    return h.response({
        status: 'success',
        data: {
            books: booksList.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    }).code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params; 
    const book = getBookById(bookId); 

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }

    return h.response({
        status: 'success',
        data: {
            book,
        },
    }).code(200);
};


const updateBookHandler = (request, h) => {
    const { bookId } = request.params; 
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const isUpdated = updateBookById(bookId, {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    });

    if (!isUpdated) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params; 

    const isDeleted = deleteBookById(bookId);

    if (!isDeleted) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

const getFinishedBooksHandler = (request, h) => {
    const books = getAllBooks(); 
    const finishedBooks = books.filter(book => book.finished); 

    return h.response({
        status: 'success',
        data: {
            books: finishedBooks
        }
    }).code(200);
};

const deleteFinishedBooksHandler = (request, h) => {
    const books = getAllBooks(); 
    const finishedBooksIds = books.filter(book => book.finished).map(book => book.id);

    if (finishedBooksIds.length === 0) {
        return h.response({
            status: 'fail',
            message: 'Tidak ada buku yang selesai dibaca untuk dihapus'
        }).code(404);
    }

    finishedBooksIds.forEach(id => deleteBookById(id));

    return h.response({
        status: 'success',
        message: 'Semua buku yang selesai dibaca telah dihapus'
    }).code(200);
};



export { addBookHandler, getBookByIdHandler, updateBookHandler,getBooksHandler, deleteBookHandler,getFinishedBooksHandler, deleteFinishedBooksHandler };
