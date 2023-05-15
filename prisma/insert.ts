/**
 * //TODO: Remove this bullshit
 *
 */
import { PrismaClient } from '@prisma/client';
const items = require('./data.json');
const prisma = new PrismaClient();

const appendItems = async () => {
  const data = items.descriptions.filter((el) => el.tradable === 1);

  const result = data.map((el: any) => ({
    classId: el.classid,
    marketHashName: el.market_hash_name,
    imageURL: el.icon_url_large,
    appId: el.appid,
    steamLink: el.actions ? el.actions[0].link : null,
    price: Number((Math.random() * 1000).toFixed(2)),
  }));
  return prisma?.item.createMany({
    data: result,
  });
};
async function main() {
  console.log('Start inserting...');
  await appendItems();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
