import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  grade: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grades: [gradeSchema]
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
