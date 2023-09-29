import prisma from "../lib/prisma"; // Import the Prisma client

// Define the main function as an asynchronous function
async function main(): Promise<void> {

  // Concurrently upsert User, Group, Provider, Model, Conversation, Message, and Tag
  const [user, group, provider, model, conversation, message, tag] = await Promise.all([
    // Upsert User with initial creditsRemaining set to 0
    prisma.user.upsert({
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
    }),

    // Upsert Group
    prisma.group.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Engineering',
        description: 'Engineering Group',
        creditsAssigned: 500,
      },
    }),

    // Upsert Provider
    prisma.provider.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'OpenAI',
        image: 'https://logowik.com/chatgpt-logo-vector-54826.html',
      },
    }),

    // Upsert Model
    // Upsert ChatGPT-3.5-turbo Model
    prisma.model.upsert({
      where: { id: 1 }, // Unique identifier for the model
      update: {}, // Update fields if the model already exists (empty here)
      create: {
        idProvider: 1, // Link to the OpenAI provider
        name: 'ChatGPT-3.5-turbo',
        active: true,
        modelType: 'TEXT', // Assuming 'TEXT' is one of the enum values for ModelType
        description: JSON.stringify({
          details: 'ChatGPT-3.5 is a state-of-the-art conversational model.',
          typeOfUse: 'Chatbots, customer service, virtual assistants',
          generalDescription: 'Designed to assist in a wide range of conversational tasks.',
          examples: 'Answering questions, generating text, tutoring, language translation',
          pricePerToken: '0.005 USD', // Replace with the actual price per token
        })
      }
    }),

    // Upsert Conversation
    prisma.conversation.upsert({
      where: { id: 1 },
      update: {},
      create: {
        idUser: 1,
        idModel: 1,
        title: 'Conversation1',
        parameters: JSON.stringify({ setting: 'default' }),
      },
    }),

    // Upsert Message
    prisma.message.upsert({
      where: { id: 1 },
      update: {},
      create: {
        idConversation: 1,
        sender: 'USER',
        content: ['Hello, how are you?'],
        creditsUsed: 1,
      },
    }),

    // Upsert Tag
    prisma.tag.upsert({
      where: { id: 1 },
      update: {},
      create: {
        idUser: 1,
        name: 'Tag1',
        color: '#FF5733',
      },
    }),
  ]);

  // Update the user's creditsRemaining based on the group they are assigned to
  await prisma.user.update({
    where: { id: user.id },
    data: {
      creditsRemaining: {
        increment: group.creditsAssigned, // Increment by the group's credits
      },
      groups: {
        connect: { id: group.id }, // Connect the user to the group
      },
    },
  });

  // Add the tag to the conversation
  await prisma.conversation.update({
    where: { id: conversation.id },
    data: {
      tags: {
        connect: { id: tag.id }, // Connect the tag to the conversation
      },
    },
  });

  // Log a success message
  console.log('Successfully seeded the database.');
}

// Run the main function and handle errors
main()
  .then(async () => {
    await prisma.$disconnect(); // Disconnect the Prisma client
  })
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Disconnect the Prisma client
    process.exit(1); // Exit the process with an error code
  });
