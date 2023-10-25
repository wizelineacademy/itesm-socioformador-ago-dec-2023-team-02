import { PrismaClient, Model, Provider, Prisma } from "@prisma/client";
import { providersData } from "../data/providers-data";
import { modelsData } from "../data/models-data";


const prisma = new PrismaClient();

// Define the main function as an asynchronous function
async function main(): Promise<void> {
  try {
    // Upsert User
    const user = await prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        idAuth0: 'auth0|123456',
        name: 'John Doe',
        email: 'john.doe@example.com',
        jobPosition: 'Software Engineer',
        role: 'USER',
        image: '',
        creditsRemaining: 0, // Initial credits set to 0
        globalParameters: JSON.stringify({ key: 'value' }),
      },
    });

    // Upsert Provider
    const upsertProviders = providersData.map((provider: Provider) => {
      return prisma.provider.upsert({
        where: { id: provider.id },
        update: {},
        create: provider,
      });
    });
    await Promise.all(upsertProviders);  // Await here to ensure providers are created before models

    // Upsert Model
    const upsertModels = modelsData.map((model: Model) => {
      return prisma.model.upsert({
        where: { id: model.id },
        update: {},
        create: { ...model, description: JSON.stringify(model.description) },
      });
    });
    await Promise.all(upsertModels);  // Await here to ensure models are created before conversations

    // Upsert Tag
    const tag = await prisma.tag.upsert({
      where: { id: 1 },
      update: {},
      create: {
        idUser: 1,
        name: 'Tag1',
        color: '#FF5733',
      },
    });

    // Upsert Conversation
    const conversation = await prisma.conversation.upsert({
      where: { id: 1 },
      update: {},
      create: {
        idUser: 1,
        idModel: 1,
        title: 'Conversation1',
        parameters: JSON.stringify({ setting: 'default' }),
        tags: {
          connect: { id: tag.id },  // Connect the tag to the conversation here
        },
      },
    });

    // Log a success message
    console.log('Successfully seeded the database.');
  } catch (e) {
    console.error(e);  // Log any errors
    throw e;  // Re-throw the error to be caught by the error handler below
  } finally {
    await prisma.$disconnect();  // Disconnect the Prisma client
  }
}

// Run the main function and handle errors
main()
  .catch(e => {
    console.error(e);  // Log any errors caught during the main execution
    process.exit(1);  // Exit the process with an error code
  });
