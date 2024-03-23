import { Schema, model, models, Document } from "mongoose";

export interface ITags extends Document {
    name: string;
    Description: string;
    Question: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdOn: Date;
}

const TagSchema = new Schema<ITags>({
    name: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Question: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
