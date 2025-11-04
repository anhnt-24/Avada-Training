import { faker } from '@faker-js/faker';
import fs from 'fs';
const PRODUCT_DATA_PATH ='../database/products.json'

const DATA_NUMS = 100

const data = Array.from({ length: DATA_NUMS }, (_, i) => ({
    id: i + 1,
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
    description: faker.commerce.productDescription(),
    product: faker.commerce.department(),
    color: faker.color.human(),
    createdAt: faker.date
        .between({ from: '2019-01-01', to: '2025-12-31' })
        .toISOString(),
    image: `https://picsum.photos/seed/${i + 1}/600/400`
}));

try{
    fs.writeFileSync(PRODUCT_DATA_PATH,JSON.stringify(data, null, 2));
    console.log('Done!');
}
catch(err){
    throw new Error(`Failed to save data to ${PRODUCT_DATA_PATH}: ${err.message}`);
}



