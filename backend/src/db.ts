import prisma from "./utils/prisma";

export const getNextTask = async (userId: number) => {
    const task = await prisma.task.findFirst({
        where: {
            done: false,
            submissions: {
                none : {
                    worker_id: userId,
                }
            }
        },
        select: {
            options: true,
            title: true,
            id: true,
            amount: true
        }
    })
    await prisma.$disconnect();
    return task
}
