import mongoose, {Schema} from "mongoose";
import {ICourse, IDepartment, IFaculty, IPaper, IProgram, IStudent, IUniversity} from "@/lib/types";

const universitySchema = new Schema<IUniversity>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {type: String, unique: true},
    faculties: [{type: Schema.Types.ObjectId, ref: 'Faculty'}]
});

const facultySchema = new Schema<IFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true
        }
    },
    departments: [{type: Schema.Types.ObjectId, ref: 'Department'}]
});

const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        }
    },
    programs: [{type: Schema.Types.ObjectId, ref: 'Program'}]
})

const programSchema = new Schema<IProgram>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    level: String,
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        }
    },
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const courseSchema = new Schema<ICourse>({
    names: [{type: String, unique: true, required: true}],
    codes: [{type: String, unique: true, required: true}],
    lecturers: [{type: String, unique: true}],
    level: {type: String, required: true},
    university: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        }
    },
    programs: [{
        name: String,
        programId: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
        }
    }],
    papers: [{type: Schema.Types.ObjectId, ref: 'Paper'}],
})

const paperSchema = new Schema<IPaper>({
    title: {
        type: String,
        required: true,
    },
    university: {
        name: String,
        code: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        }
    },
    faculty: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        }
    },
    department: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        }
    },
    program: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        }
    },
    course: {
        name: String,
        code: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        }
    },
    year: String,
    paperType: String,
    internalExaminer: String,
    externalExaminer: String,
    url: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    author: {
        id: {type: Schema.Types.ObjectId, ref: 'Student'},
        name: String,
    },
}, {timestamps: true});

const studentSchema = new Schema<IStudent>({
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
    streak: {type: Number, default: 0},
    lastLogin: {type: Date, default: new Date()},
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

studentSchema.methods.checkStreak = async function (this) {
    try {
        const now = new Date();
        const lastLoginDate = new Date(this.lastLogin);

        // Check if it's the same day:
        const sameDay = now.getDate() === lastLoginDate.getDate();

        if (sameDay) {
        } else {
            // Check for streak reset:
            const daysSinceLastLogin = (now.valueOf() - lastLoginDate.valueOf()) / (1000 * 3600 * 24);
            if (daysSinceLastLogin >= 2) {
                this.streak = 1;
            } else {
                // Continue streak if it's the next day:
                this.streak += 1;
            }
        }

        this.lastLogin = now;
        return this.save();
    } catch (error) {
        console.error('Error in checkStreak:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }

};


export const University = mongoose.models.University || mongoose.model<IUniversity>('University', universitySchema);
export const Faculty = mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', facultySchema);
export const Department = mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);
export const Program = mongoose.models.Program || mongoose.model<IProgram>('Program', programSchema);
export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
export const Paper = mongoose.models.Paper || mongoose.model<IPaper>('Paper', paperSchema);
