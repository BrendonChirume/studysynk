import {prisma} from ".";

export async function getPaperById(id: string) {
    try {
        const paper = await prisma.paper.findUnique({
            where: {id}
        })
        return {paper}
    } catch (error) {
        return {error}
    }
}

export async function getPapers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/papers`)
    if (!res.ok){
        throw new Error('Failed to fetch data!');
    }
    return res.json();
}
