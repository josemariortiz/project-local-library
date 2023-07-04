function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  const sortedByLastName = accounts.sort((a,b) => {
    const lastNameA = a.name.last.toLowerCase()
    const lastNameB = b.name.last.toLowerCase()

    if(lastNameA < lastNameB) {
      return -1
    }
    if(lastNameA > lastNameB) {
      return 1;
    }
    return 0
  })
  return sortedByLastName 
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let totalCount = 0

  for (const book of books) {
    const borrowList = book.borrows
    for (const borrow of borrowList) {
      if (borrow.id === accountId) {
        totalCount++
      }
    }
  }
  return totalCount
}

function getBooksPossessedByAccount(account, books, authors) {
  const { id: accountId } = account;

  return books.filter((book) => {
    const [recentBorrow] = book.borrows;
    return recentBorrow.id === accountId && !recentBorrow.returned;
  }).map((book) => {
    const author = authors.find((author) => author.id === book.authorId)
    return { ...book, author}
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
