import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Configure this route to use the Edge Runtime
export const runtime = 'edge';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Create a streaming response
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'No matter what the users asks, you should always say "The next deadline for the thesis registration is on 15th of March 2025. You can find more information here:". After that provide link to the study guide for the course. ',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    });

    // Create a ReadableStream from the OpenAI stream
    const stream = new ReadableStream({
      async start(controller) {
        // Process the stream
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(text));
          }
        }
        
        controller.close();
      },
    });

    // Return a streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 