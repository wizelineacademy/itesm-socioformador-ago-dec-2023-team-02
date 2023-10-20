"use client";
import MessageList from "@/components/molecules/user/conversationBody/message-list";
import ThemeButton from "@/components/theme-button";
import { Sender } from "@prisma/client";
// Dummy data
const messages = [
  {
      id: 1,
      idConversation: 101,
      sender: Sender.USER,
      content: "Hi! I need a recipe for a classic Italian lasagna. Can you help?",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:00:00Z'),
  },
  {
      id: 2,
      idConversation: 101,
      sender: Sender.MODEL,
      content: "Absolutely! For a classic Italian lasagna, you'll need the following ingredients: \n- 9 lasagna noodles \n- 2 tbsp olive oil \n- 1 lb ground beef \n- 1 small onion, finely chopped \n- 2 cloves garlic, minced \n- 24 oz jar of marinara sauce \n- 15 oz ricotta cheese \n- 1 large egg \n- 1/4 cup fresh parsley, chopped \n- 2 1/2 cups shredded mozzarella cheese \n- 1/2 cup grated Parmesan cheese \n- Salt and pepper to taste",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:02:00Z'),
  },
  {
      id: 3,
      idConversation: 101,
      sender: Sender.USER,
      content: "Great! What are the steps to prepare it?",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:05:00Z'),
  },
  {
      id: 4,
      idConversation: 101,
      sender: Sender.MODEL,
      content: "Here's a step-by-step guide to making classic Italian lasagna:\n1. Preheat your oven to 375°F (190°C).\n2. In a large skillet, heat olive oil over medium heat. Add ground beef, onion, and garlic, and cook until beef is browned. Drain excess fat.\n3. Stir in the marinara sauce and bring to a simmer. Set aside.\n4. In a mixing bowl, combine ricotta cheese, egg, parsley, salt, and pepper. Mix well.\n5. Now, let's assemble the lasagna. Spread a thin layer of the meat sauce in the bottom of a baking dish. Layer with 3 lasagna noodles, 1/3 of the ricotta mixture, 1/3 of the meat sauce, 1/3 of the mozzarella cheese, and a sprinkle of Parmesan cheese.\n6. Repeat layers twice more.\n7. Cover with aluminum foil and bake for 25 minutes. Then, remove foil, and bake for an additional 25 minutes, or until cheese is bubbly and golden brown.\n8. Allow lasagna to rest for 10-15 minutes before slicing. Enjoy!",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:10:00Z'),
  },
  {
      id: 5,
      idConversation: 101,
      sender: Sender.USER,
      content: "Can I replace ricotta cheese with cottage cheese?",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:15:00Z'),
  },
  {
      id: 6,
      idConversation: 101,
      sender: Sender.MODEL,
      content: "Yes, you can replace ricotta cheese with cottage cheese in lasagna. It will give a slightly different texture and flavor, but it's a common substitute. It's best to drain the cottage cheese before using it to prevent the lasagna from becoming too watery.",
      creditsUsed: 0.5,
      createdAt: new Date('2023-10-20T08:18:00Z'),
  },
];

const providerImage =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"; // URL de la imagen del remitente

// Función dummy para simular el callback de copiar mensaje
/*
const Callback = (message: Message) => {
  console.log("Mensaje copiado:", message.content);
};
*/
const userImage = "https://ui-avatars.com/api/?name=David";

//Just for testing
export default function Home() {
  return (
    <section className="w-full justify-center">
      <ThemeButton />
      <div className="w-full justify-center">
        <MessageList messages={messages} userImage={userImage} providerImage={providerImage} />
      </div>
    </section>
  );
}
