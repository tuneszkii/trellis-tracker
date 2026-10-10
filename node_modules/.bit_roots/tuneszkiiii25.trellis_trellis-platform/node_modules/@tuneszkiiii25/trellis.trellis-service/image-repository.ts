import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  { timestamps: true }
);

const ImageModel = (mongoose.models.Image ||
  mongoose.model('Image', imageSchema)) as mongoose.Model<any>;

/** A stored picture. */
export type StoredImage = { data: Buffer; contentType: string };

/**
 * Stores uploaded pictures (project logos and card covers) in MongoDB,
 * kept apart from projects so project payloads stay small.
 */
export class ImageRepository {
  /** Saves an image and returns its id. */
  async save(image: StoredImage): Promise<string> {
    const doc = await ImageModel.create(image);
    return String(doc._id);
  }

  /** Reads an image by id, or null. */
  async get(id: string): Promise<StoredImage | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    const doc = await ImageModel.findById(id);
    return doc ? { data: Buffer.from(doc.data), contentType: doc.contentType } : null;
  }
}
