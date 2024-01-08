export interface ICourse {
    _id: string;
    name: string,
    university: string,
    faculty: string,
    department: string,
    program: string,
    papers: IPaper[]
}

export interface IProgram {
    _id: string;
    name: string,
    level: string,
    university: string,
    faculty: string,
    department: string,
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
    university: {
        name: string,
        id: string
    }
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
    university: string;
    faculty: string;
    department: string;
    program: string;
    course: string;
    year: string;
    paperType: string;
    internalExaminer: string;
    externalExaminer: string;
    url: string;
    description: string;
    author: {
        id: string,
        name: string
    };
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
    university: {
        name: string;
        id: string;
    },
    faculty: {
        name: string;
        id: string;
    },
    department: {
        name: string;
        id: string;
    },
    program: {
        name: string;
        id: string;
    },
}