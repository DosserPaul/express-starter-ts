import {PrismaClient} from "@prisma/client";

const userIsAdminOfChat = async (chatId: number, userId: number): Promise<boolean> => {
  try {
    const prisma = new PrismaClient();

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            userId,
            status: 'admin',
          },
        },
      },
    });

    return !!chat;
  } catch (error) {
    console.error('Error checking if user is admin of chat:', error);
    return false;
  }
}

export default userIsAdminOfChat;
