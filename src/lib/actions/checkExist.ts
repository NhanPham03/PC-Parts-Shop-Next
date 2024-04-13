import prisma from "../db";

export async function checkAccountExists(username: string) {
  const account = await prisma.account.count({ where: { username: username } });

  return (account !== 0);
}
