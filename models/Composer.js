import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ComposerSchema = new Schema({
  name:String
},{
  strict:false,
  versionKey: false
});

const Composer = model('Composer', ComposerSchema);
export default Composer;