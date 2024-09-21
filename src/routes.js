import { addBookHandler, getBooksHandler, getBookByIdHandler,updateBookHandler , deleteBookHandler,getFinishedBooksHandler,deleteFinishedBooksHandler} from './handler.js';

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/finished',
        handler: getFinishedBooksHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}', 
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}', 
        handler: updateBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/finished',
        handler: deleteFinishedBooksHandler,
    }
];

export default routes;
