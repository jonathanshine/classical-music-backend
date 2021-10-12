import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ComposerSchema = new Schema({
  name:String,
  // works: [{ type: Schema.Types.ObjectId, ref: "Work", required: false }]
},{
  strict:false,
  versionKey: false
});

const Composer = model('Composer', ComposerSchema);
export default Composer;