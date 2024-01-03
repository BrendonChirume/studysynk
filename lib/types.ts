// Define the University interface

import {Schema} from "mongoose";

export interface Course {
    name: string,
    papers: [{ type: Schema.Types.ObjectId, ref: 'Paper' }]
}

export interface Program {
    name: string,
    level: string,
    courses: Course[]
}

export interface Department {
    name: string,
    programs: Program[]
}

export interface Faculty {
    name: string,
    departments: Department[]
}


export interface University {
    _id: string,
    name: string,
    code: string,
    faculties: Faculty[]
}

// Define the QuestionPaper interface
export interface Paper {
    _id: string;
    name: string;
    title: string;
    date: string;
    course: string;
    faculty: string;
    department: string;
    program: string;
    year: string;
    description: string;
    url: string;
    university: string;
    internalExaminer: string;
    externalExaminer: string;
}

export interface Student {
    _id: string;
    name: string;
    password: string;
    email: string;
    bio: string;
    image: string;
    program: string;
    university: string;
}