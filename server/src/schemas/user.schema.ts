import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  country: string;
  role: number;
}

@Schema()
export class User implements UserInterface {
  @Prop({ type: String, unique: false })
  username: string;

  @Prop({ unique: true, type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: Number, default: 1 })
  role: number;
  @Prop({ default: Date.now })
  createdAt!: Date;
  static role: any;
  static username: any;
  static email: any;
}

export const UserSchema = SchemaFactory.createForClass(User);