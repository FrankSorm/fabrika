import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/book.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(createBookDto: CreateBookDto): Promise<{ status: boolean; bookId: string }> {
    const book = new this.bookModel({ ...createBookDto, bookId: uuidv4() });
    await book.save();
    return { status: true, bookId: book.bookId };
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find({}, { _id: false, __v: false }).exec();
  }
}