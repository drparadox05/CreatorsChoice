import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getNextTask = async (userId: number) => {
    const task = await prismaClient.task.findFirst({
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

    return task
}
