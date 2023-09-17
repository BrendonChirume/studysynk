// Define the University interface
interface University {
    id: string;
    name: string;
    acronym: string;
}

// Define the Faculty interface
interface Faculty {
    id: string;
    name: string;
    universityId: string;
}

// Define the Program interface
interface Program {
    id: string;
    name: string;
    students: Student[];
}

// Define the Program interface
interface Course {
    id: string;
    name: string;
    code: string;
    programId: string;
}

// Define the Student interface
interface Student {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    program: Program;
    email: string;
    bio: string;
    university?: University
    universityId?: string
}

// Define the QuestionPaper interface
interface QuestionPaper {
    id: string;
    title: string;
    description?: string
    uploadDate: Date;
    fileUrl: string;
    program: Program;
    year: number;
    university: University;
    programId: string;
    universityId: string;
}
