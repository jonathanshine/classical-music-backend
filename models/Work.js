import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const WorkSchema = new Schema({
  title: String
},{
  strict: false,
  versionKey: false
});

const Work = model('Work', WorkSchema);

export default Work;