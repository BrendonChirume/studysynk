import mongoose, {Schema} from "mongoose";
import {ICourse, IDepartment, IFaculty, IPaper, IProgram, IStudent, IUniversity} from "@/lib/types";

const universitySchema = new Schema({
    name: String,
    code: String,
    faculties: [{type: Schema.Types.ObjectId, ref: 'Faculty'}]
});

const facultySchema = new Schema({
    name: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
            unique: true,
        }
    },
    departments: [{type: Schema.Types.ObjectId, ref: 'Department'}]
});

const departmentSchema = new Schema({
    name: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
            unique: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
            unique: true,
        }
    },
    programs: [{type: Schema.Types.ObjectId, ref: 'Program'}]
})

const programSchema = new Schema({
    name: String,
    level: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
            unique: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
            unique: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            unique: true,
        }
    },
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const courseSchema = new Schema({
    name: [String],
    code: [String],
    lecturers: [String],
    level: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
            unique: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
            unique: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            unique: true,
        }
    },
    program: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
            unique: true,
        }
    },
    papers: [{type: Schema.Types.ObjectId, ref: 'Paper'}],
})

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
    },
    bio: String,
    image: String,
    streak: String,
    university: {
        name: String,
        id: String,
    },
    faculty: {
        name: String,
        id: String,
    },
    department: {
        name: String,
        id: String,
    },
    program: {
        name: String,
        id: String,
    },
}, {timestamps: true});

const paperSchema = new Schema({
    title: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
            unique: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
            unique: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            unique: true,
        }
    },
    program: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
            unique: true,
        }
    },
    course: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
            unique: true,
        }
    },
    year: String,
    paperType: String,
    internalExaminer: String,
    externalExaminer: String,
    url: String,
    description: String,
    author: {
        id: String,
        name: String,
    },
    createdAt: String,
    updatedAt: String,
}, {timestamps: true});

export const University = mongoose.models.University || mongoose.model<IUniversity>('University', universitySchema);
export const Faculty = mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', facultySchema);
export const Department = mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);
export const Program = mongoose.models.Program || mongoose.model<IProgram>('Program', programSchema);
export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
export const Paper = mongoose.models.Paper || mongoose.model<IPaper>('Paper', paperSchema);
