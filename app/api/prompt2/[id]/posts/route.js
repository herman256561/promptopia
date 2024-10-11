import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// The original endpoint /api/prompt/route.js cannot be fetched properly. 
// Thus, create this new endpoint to handle the GET request from the Feed component
export const GET = async(request, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find(params).populate('creator');
    
        return new Response(JSON.stringify(prompts), {status:200});
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status:500})
    }
}