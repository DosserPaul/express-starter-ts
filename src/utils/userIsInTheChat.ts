import {PrismaClient} from "@prisma/client";

const userIsInTheChat = async (userId: number, chatId: number): Promise<boolean> => {
  const prisma = new PrismaClient();

  const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            userId,
          },
        },
      },
    });

  return !!chat;
}

export default userIsInTheChat;
