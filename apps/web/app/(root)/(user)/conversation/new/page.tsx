
import Welcome from "@/components/user/newConversation/organism/welcome";
import { getAllModelsWithProvider } from "@/lib/model";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";

export default async function NewConversationPage(){

    const models: ModelWithProvider[] = (await getAllModelsWithProvider()).data || [];

    return(
        <Welcome models={models}/>
    );
}
