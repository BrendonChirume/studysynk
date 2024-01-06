export interface ICourse {
    _id: string;
    name: string,
    papers: IPaper[]
}

export interface IProgram {
    _id: string;
    name: string,
    level: string,
    courses: ICourse[]
}

export interface IDepartment {
    _id: string;
    name: string,
    university: string,
    faculty: string,
    programs: IProgram[]
}

export interface IFaculty {
    _id: string;
    name: string,
    university: string,
    departments: IDepartment[]
}


export interface IUniversity {
    _id: string,
    name: string,
    code: string,
    faculties: IFaculty[]
}

export interface IPaper {
    _id: string;
    title: string;
    date: string;
    course: string;
    faculty: string;
    department: string;
    program: string;
    year: string;
    description: string;
    url: string;
    author: {
        id: string,
        name: string
    };
    university: string;
    internalExaminer: string;
    externalExaminer: string;
    createdAt: string;
    updatedAt: string;
}

export interface IStudent {
    _id: string;
    name: string;
    password: string;
    email: string;
    bio: string;
    streak: string;
    image: string;
    program: string;
    university: string;
}