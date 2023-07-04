function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let counter = 0

  for (book of books) {
    const borrowArray = book.borrows
    const firstBorrowsObj = borrowArray[0]
    
    if (!firstBorrowsObj.returned) {
      counter++
    }
  }
  return counter
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((count, book) => {
    const genre = book.genre
    if (count[genre]) {
      count[genre]++
    } else {
      count[genre] = 1
    }
    return count
  }, {})

  const genreArray = []
  for (let genre in genreCount) {
    genreArray.push({ name: genre, count: genreCount[genre]})
  }

  const topGenres = genreArray.sort((a,b) => b.count - a.count).slice(0, 5)

  return topGenres

}

function getMostPopularBooks(books) {
  const borrowCount = books.reduce((count, book) => {
    const borrowArray = book.borrows;
    const borrowCount = borrowArray.length;
    count[book.title] = borrowCount;
    return count
  }, {})

  const popularBooks = []
  for (let title in borrowCount) {
    popularBooks.push({ name: title, count: borrowCount[title] })
  }

  const topBooks = popularBooks.sort((book1, book2) => book2.count - book1.count).slice(0,5)

  return topBooks

}

function getMostPopularAuthors(books, authors) {
  const authorCounts = books.reduce((count, book) => {
    const author = authors.find((author) => author.id === book.authorId)
    const authorName = `${author.name.first} ${author.name.last}`
    count[authorName] = count[authorName] ? count[authorName] + book.borrows.length : book.borrows.length
    return count
  }, {})

  const popularAuthors = Object.entries(authorCounts).map(([name, count]) => ({ name, count})).sort((author1, author2) => author2.count - author1.count).slice(0, 5)

  return popularAuthors
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
