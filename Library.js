const readline = require("readline");

// Sample library collection
let library = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", available: true },
  { title: "1984", author: "George Orwell", genre: "Dystopian", available: false },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", available: true },
  { title: "Animal Farm", author: "George Orwell", genre: "Dystopian", available: true },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", genre: "Fantasy", available: false }
];

// ================= Functions =================

// 1. Count the total number of books
function countBooks(collection) {
  return collection.length;
}

// 2. Filter books by genre
function filterByGenre(collection, genre) {
  return collection.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
}

// 3. Find the most frequently occurring author
function mostFrequentAuthor(collection) {
  const authorCount = {};
  collection.forEach(book => {
    authorCount[book.author] = (authorCount[book.author] || 0) + 1;
  });

  let maxAuthor = null;
  let maxCount = 0;
  for (let author in authorCount) {
    if (authorCount[author] > maxCount) {
      maxCount = authorCount[author];
      maxAuthor = author;
    }
  }

  return { author: maxAuthor, count: maxCount };
}

// 4. Group books by availability (available vs borrowed)
function groupByAvailability(collection) {
  return {
    available: collection.filter(book => book.available),
    borrowed: collection.filter(book => !book.available)
  };
}

// 5. Simulate an async request to fetch newly added books and update the collection
function fetchNewBooks() {
  return new Promise(resolve => {
    setTimeout(() => {
      const newBooks = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
        { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", available: true }
      ];
      resolve(newBooks);
    }, 2000); // simulate 2-second delay
  });
}

async function updateLibrary() {
  console.log("\nFetching new books...");
  const newBooks = await fetchNewBooks();
  library = [...library, ...newBooks];
  console.log("✅ Library updated with new books!");
  console.log("📚 Updated Library:", library);
}

// ================= Console Menu =================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n========= 📚 Library Management =========");
  console.log("1. Count total number of books");
  console.log("2. Filter books by genre");
  console.log("3. Find most frequent author");
  console.log("4. Group books by availability");
  console.log("5. Fetch and update library with new books");
  console.log("6. Exit");
  rl.question("👉 Choose an option: ", handleMenu); 
}

async function handleMenu(choice) {
  switch (choice) {
    case "1":
      console.log("\n📊 Total books:", countBooks(library));
      break;
    case "2":
      rl.question("\nEnter genre to filter: ", genre => {
        console.log(`\n🎭 Books in genre "${genre}":`, filterByGenre(library, genre));
        showMenu();
      });
      return;
    case "3":
      console.log("\n👑 Most frequent author:", mostFrequentAuthor(library));
      break;
    case "4":
      console.log("\n📦 Grouped by availability:", groupByAvailability(library));
      break;
    case "5":
      await updateLibrary();
      break;
    case "6":
      console.log("\n👋 Exiting... Goodbye!");
      rl.close();
      return;
    default:
      console.log("\n❌ Invalid choice, try again.");
  }
  showMenu();
}

// Start program
showMenu();