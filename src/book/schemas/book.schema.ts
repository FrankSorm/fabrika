import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  bookId: string;

  @Prop()
  bookName: string;

  @Prop()
  price: number;

  @Prop()
  currency: 'CZK' | 'EUR';

  @Prop()
  description?: string;

  @Prop()
  author?: string;

  @Prop()
  isbn?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);