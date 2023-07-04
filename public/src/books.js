function findAuthorById(authors, id) {
  const foundId = authors.find((author) => author.id === id)
  return foundId
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id)
  return foundBook
}

function partitionBooksByBorrowedStatus(books) {
  const isNotAvailable = []
  const isAvailable = []

  for (book of books) {
    const borrowArray = book.borrows
    const firstReturned = borrowArray[0]

    if(firstReturned.returned) {
      isAvailable.push(book)
    } else {
      isNotAvailable.push(book)
    }
  }
  return [isNotAvailable, isAvailable]
}

function getBorrowersForBook(book, accounts) {
  const borrowers = []

  for (const transaction of book.borrows) {
    const accountId = transaction.id
    const account =  accounts.find((acc) => acc.id === accountId)
    account.returned = transaction.returned
    borrowers.push(account)

    if (borrowers.length === 10) {
      break
    }
  }
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
