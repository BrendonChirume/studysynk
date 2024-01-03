import mongoose, {Schema} from "mongoose";

const universitySchema = new Schema({
    name: String,
    code: String,
    faculties: [{
        name: String,
        departments: [{
            name: String,
            programs: [{
                name: String,
                level: String,
                courses: [{
                    name: String,
                    papers: [{type: Schema.Types.ObjectId, ref: 'Paper'}]
                }]
            }]
        }]
    }]
});

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Adjusted email validation regex
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    bio: String,
    image: String,
    program: String,
    university:  String,
}, {timestamps: true});

const paperSchema = new Schema({
    name: String,
    title: String,
    date: String,
    course: String,
    faculty: String,
    department: String,
    program: String,
    year: String,
    description: String,
    src: String,
    university: String,
    internalExaminer: String,
    externalExaminer: String,
}, {timestamps: true});

export const University = mongoose.models.University || mongoose.model('University', universitySchema);
export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export const Paper = mongoose.models.Paper || mongoose.model('Paper', paperSchema);
