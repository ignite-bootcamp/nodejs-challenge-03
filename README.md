<h1 align='center'>nodejs-challenge-03</h1>
<p align='center'>In this challenge we learned how to build a api with the concept of dependency inversion using repositories, implementing unit tests using in memory repositories and e2e tests with a custom vitest environment for prisma</p>

## 🛠 Technologies

This project was developed with the following technologies:

Backend

- [NodeJS](https://nodejs.org/)
- [Typescript](https://typescriptlang.org/)
- [Postgres](https://www.postgresql.org)
- [Docker](https://www.docker.com)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Zod](https://zod.dev/)

## 📱💻 Instructions

```
## 1. Clone repo
git clone https://github.com/guivictorr/nodejs-challenge-03.git

## 2. Change to project folder
cd nodejs-challenge-03

## 3. Install dependencies
npm intall

## 4. Configure your .env file

## 5. Start a postgresql database using docker
# You need to have docker-compose and docker installed
docker-compose up -d

## 6. Run migrations
npx prisma migrate dev

## 7. Run the app
npm run dev
```

## 🤔 How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

Once your pull request has been merged, you can delete your branch.

## API Requirements

- [x] It must be possible to register a pet.
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet available for adoption.
- [x] It must be possible to register as an organization (ORG).
- [x] It must be possible to log in as an organization (ORG).

**Business Rules:**

- To list pets, it is mandatory to inform the city.
- An organization (ORG) needs to have an address and a WhatsApp number.
- A pet must be associated with an organization (ORG).
- Users who want to adopt a pet will contact the organization through WhatsApp.
- All filters, besides the city, are optional.
- An organization (ORG) needs to be logged in to access the application as an admin.
