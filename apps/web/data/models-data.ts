import { Model, ModelType } from '@prisma/client';

export const modelsData: Model[] = [
    /**
     * openAI Models
     */
    {
        id: 1,
        idProvider: 1,
        name: 'gpt-3.5-turbo',
        active: true,
        modelType: "TEXT",
        description: JSON.stringify({
            details: "ChatGPT-3.5-turbo is an iteration of the GPT-3 model by OpenAI, optimized for conversational applications. It is built using a Transformer architecture which allows it to capture long-range dependencies in text.",
            generalDescription: "With its ability to understand context and provide relevant responses, ChatGPT-3.5-turbo excels in simulating human-like text interactions. Its intellectual capabilities allow for tutoring and detailed explanations, while its creative side can be seen in text generation and language translation tasks.",
            typeOfUse: [
                "Engaging customers in a conversation",
                "Answering product or service related queries",
                "Providing tutoring in chat format",
                "Aiding in language translation in real-time conversations"
            ],
            examples: [
                "Explain the basics of machine learning",
                "Help with product choices",
                "Translate a paragraph from English to French",
                "Generate creative writing pieces"
            ],
            capabilities: [
                "Maintains a coherent conversation",
                "Provides detailed responses",
                "Capable of language translation",
                "Generates creative text"
            ],
            limitations: [
                "May occasionally generate incorrect information",
                "May produce biased content or fail to handle sensitive topics well",
                "Limited knowledge of world and events after 2021"
            ],
            pricePerToken: '0.0015 USD per 1,000 tokens for input and 0.002 USD per 1,000 tokens for output',
        }),
    },
    {
        id: 2,
        idProvider: 1,
        name: 'gpt-3.5-turbo-16k',
        active: true,
        modelType: "TEXT",
        description: JSON.stringify({
            details: "GPT-3.5-turbo-16k extends the token limit of GPT-3.5-turbo, allowing for longer conversations and more detailed responses. This model retains the Transformer architecture, making it suitable for more intricate and detailed conversational tasks.",
            generalDescription: "The extended token limit of GPT-3.5-turbo-16k enhances its intellectual and creative capabilities, allowing for in-depth discussions, thorough explanations, and the generation of longer creative text.",
            typeOfUse: [
                "Engaging in longer and detailed tutoring sessions in chat",
                "Providing more elaborate explanations or solutions in a chat format",
                "Aiding in technical troubleshooting over chat"
            ],
            examples: [
                "Provide a detailed explanation of a complex topic",
                "Aid in long-form technical troubleshooting",
                "Generate a detailed narrative",
                "Engage in an extended conversation on a specific topic"
            ],
            capabilities: [
                "Handles longer conversations",
                "Provides more detailed responses",
                "Capable of generating longer creative text",
                "Aids in technical troubleshooting"
            ],
            limitations: [
                "May occasionally generate incorrect or incomplete information",
                "May produce biased content or fail to handle sensitive topics well",
                "Limited knowledge of world and events after 2021"
            ],
            pricePerToken: "0.003 USD per 1,000k tokens for input and 0.004 USD per 1,000 tokens for output",
        }),
    },

    {
        id: 3,
        idProvider: 1,
        name: 'gpt-4',
        active: true,
        modelType: "TEXT",
        description: JSON.stringify({
            details: "GPT-4 is an advanced iteration over previous models with more parameters allowing for better understanding of text and context. This model is built on a refined Transformer architecture and trained on a larger dataset for higher accuracy and creativity in text generation and understanding.",
            generalDescription: "GPT-4’s intellectual prowess is seen in its ability to handle complex queries and provide insightful responses. Its creative capabilities shine in generating unique text, brainstorming ideas, and assisting in creative writing tasks.",
            typeOfUse: [
                "Generating creative writing pieces in chat",
                "Aiding in research by providing detailed explanations and summaries",
                "Assisting in coding or scripting tasks within a chat interface"
            ],
            examples: [
                "Explain the theory of relativity",
                "Provide creative ideas for a short story",
                "Summarize the latest advances in machine learning",
                "Generate a script for data analysis in Python"
            ],
            capabilities: [
                "Handles complex queries with better understanding",
                "Generates highly creative and unique text",
                "Provides detailed explanations and summaries",
                "Assists in coding or scripting tasks"
            ],
            limitations: [
                "May occasionally generate incorrect or misleading information",
                "May produce biased content or not handle sensitive topics well",
                "Limited knowledge of world and events after 2021"
            ],
            pricePerToken: "0.03 USD per 1,000 tokens for input and 0.06 USD per 1,000 tokens for output",
        }),
    },
    {
        id: 4,
        idProvider: 1,
        name: 'dalle',
        active: true,
        modelType: 'IMAGE',
        description: JSON.stringify({
            details: 'DALL-E is a unique model trained to generate images from textual descriptions. Unlike text-based models, DALL-E excels in visual creativity, transforming textual ideas into visual representations. It’s built on a variant of the GPT-3 architecture, designed for image generation.',
            generalDescription: 'DALL-E’s intellectual capability is showcased in its understanding of textual descriptions and its creative capacity shines in generating unique, relevant images.',
            typeOfUse: [
                'Generating visual content based on textual descriptions in chat',
                'Aiding in creative design brainstorming within a chat interface',
                'Providing visual storytelling or illustration services in chat'
            ],
            examples: [
                "Create an illustration of a futuristic city",
                "Generate visual content for social media post",
                "Design a logo based on specified themes",
                "Visualize a scene described in a book"
            ],
            capabilities: [
                "Transforms textual descriptions into visual representations",
                "Generates unique and creative images",
                "Aids in brainstorming and visual storytelling",
                "Handles a variety of artistic styles and themes"
            ],
            limitations: [
                "Generated images may sometimes lack clarity or detail",
                "May not always interpret textual descriptions accurately",
                "Limited to the information and training received up to 2021"
            ],
            pricePerToken: 'Price is based on the image’s resolution; 0.016 USD for a resolution of 256x256 pixels, 0.018 USD for a resolution of 512x512 pixels and 0.02 USD for a resolution of 1024x1024 pixels.',
        }),
    }
]