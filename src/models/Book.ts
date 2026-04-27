export interface Book {
  id: number;
  author: string;
  title: string;
  isbn: string;
  category: string;
  isAvailable: boolean;
  createAt: Date;
}
