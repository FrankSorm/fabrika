import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/book.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Book, BookDocument } from './schemas/book.schema';

describe('BookController', () => {
  let controller: BookController;
  let bookService: BookService;

  const mockBookModel: Model<BookDocument> = {
    find: jest.fn(),
    create: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createBook', () => {
    it('should create a book and return bookId', async () => {
      const createBookDto: CreateBookDto = {
        bookName: 'Test Book',
        price: 10,
        currency: 'EUR',
        description: 'Test description',
      };

      const expectedResponse = {
        status: true,
        bookId: expect.any(String),
      };

      jest.spyOn(bookService, 'createBook').mockResolvedValueOnce(expectedResponse);

      const result = await controller.createBook(createBookDto);

      expect(result).toEqual(expectedResponse);
      expect(bookService.createBook).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const mockBooks: (Omit<Book, 'bookId'> & { _id: string })[] = [
        {
          bookName: 'Test Book 1',
          price: 20,
          currency: 'CZK',
          description: 'Test description 1',
          _id: uuidv4(),
        },
        {
          bookName: 'Test Book 2',
          price: 30,
          currency: 'EUR',
          description: 'Test description 2',
          _id: uuidv4(),
        },
      ];

      jest.spyOn(bookService, 'getAllBooks').mockResolvedValueOnce(mockBooks as any);

      const result = await controller.getAllBooks();

      expect(result).toEqual(mockBooks);
      expect(bookService.getAllBooks).toHaveBeenCalled();
    });
  });
});
