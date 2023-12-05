import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/book.dto';

@ApiTags('books')
@Controller('api')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/book')
  @ApiOperation({ summary: 'Create new book' })
  @ApiBody({ type: CreateBookDto })
  @UsePipes(new ValidationPipe({ 
    transform: true, // Použití ValidationPipe s automatickou transformací
    skipMissingProperties: true,
    forbidUnknownValues: true,
  }))
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get('/books')
  @ApiOperation({ summary: 'Get all books' })
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
}