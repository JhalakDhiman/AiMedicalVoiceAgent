import OpenAi from 'openai'

export const openai = new OpenAi({
    baseURL:"https://openrouter.ai/api/v1",
    apiKey:process.env.OPEN_ROUTER_API
})