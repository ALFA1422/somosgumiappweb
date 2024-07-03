import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  options: [{ type: String }],  // Opciones del producto
  available: Boolean,
});
