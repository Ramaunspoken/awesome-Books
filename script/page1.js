// This generateId function will return unique id for book
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// Book constructor will create a single book.
export default class Book {
  constructor(name, writer) {
    this.id = generateId();
    this.name = name;
    this.writer = writer;
  }
}