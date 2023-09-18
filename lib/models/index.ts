import mongoose, {Schema} from "mongoose";

const universitySchema = new Schema({
    name: String,
    acronym: String,
    programs: [{type: Schema.Types.ObjectId, ref: 'Program'}]
});

const facultySchema = new Schema({
    name: String,
    department: String,
    university: {type: Schema.Types.ObjectId, ref: 'University'},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});


const programSchema = new Schema({
    name: String,
    faculty: {type: Schema.Types.ObjectId, ref: 'Faculty'},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

const courseSchema = new Schema({
    name: String,
    program: {type: Schema.Types.ObjectId, ref: 'Program'},
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    papers: [{type: Schema.Types.ObjectId, ref: 'Paper'}]
});

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio: String,
    profileImage: Buffer,
    program: {type: Schema.Types.ObjectId, ref: 'Program'},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
}, {timestamps: true});

const paperSchema = new Schema({
    title: String,
    content: String,
    course: {type: Schema.Types.ObjectId, ref: 'Course'}
});

export const University = mongoose.models.University || mongoose.model('University', universitySchema);
export const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);
export const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export const Student = mongoose.models.Student || mongoose.models.Student || mongoose.model('Student', studentSchema);
export const Paper = mongoose.models.Paper || mongoose.model('Paper', paperSchema);
