import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// This endpoint will be fetched by profile page.
// To get all the posts created by a specific user
export const GET = async(request, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({ creator:params.id }).populate('creator');
    
        return new Response(JSON.stringify(prompts), {status:200});
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status:500})
    }
}