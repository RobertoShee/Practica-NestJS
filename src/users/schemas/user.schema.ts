import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // 👈 Esto crea automáticamente createdAt y updatedAt
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: ['user'] }) // 👈 Roles por defecto
  roles: string[];

  @Prop() // 👈 URL o ruta local del avatar (opcional)
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);