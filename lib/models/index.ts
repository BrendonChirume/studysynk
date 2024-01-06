import mongoose, {Schema} from "mongoose";
import {ICourse, IDepartment, IFaculty, IPaper, IProgram, IStudent, IUniversity} from "@/lib/types";

const universitySchema = new Schema({
    name: String,
    code: String,
    faculties: [String]
});

const facultySchema = new Schema({
    name: String,
    university: String,
    departments: [String]
});

const departmentSchema = new Schema({
    name: String,
    university: String,
    faculty: String,
    programs: [String]
})

const programSchema = new Schema({
    name: String,
    level: String,
    courses: [String]
})

const courseSchema = new Schema({
    name: String,
    code: String,
    lecturer: String,
    level: String,
    papers: [String]
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
    program: String,
    university: String,
}, {timestamps: true});

const paperSchema = new Schema({
    name: String,
    title: String,
    course: String,
    faculty: String,
    department: String,
    program: String,
    university: String,
    date: String,
    description: String,
    author: {
        id: String,
        name: String
    },
    src: String,
    internalExaminer: String,
    externalExaminer: String,
}, {timestamps: true});

export const University = mongoose.models.University || mongoose.model<IUniversity>('University', universitySchema);
export const Faculty = mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', facultySchema);
export const Department = mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);
export const Program = mongoose.models.Program || mongoose.model<IProgram>('Program', programSchema);
export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
export const Paper = mongoose.models.Paper || mongoose.model<IPaper>('Paper', paperSchema);
