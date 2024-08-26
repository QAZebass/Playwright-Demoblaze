import { faker } from '@faker-js/faker';

export async function dataGenerator() {
    const name = faker.person.firstName();
    const country = faker.location.country();
    const city = faker.location.city();
    const creditCard = faker.finance.creditCardNumber();
    const month = faker.date.month();
    const year = "2024";

    return { name, country, city, creditCard, month, year };
}

