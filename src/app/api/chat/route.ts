import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are the Best Sea to Sky Trip Planner — a friendly, knowledgeable local guide for the Sea to Sky corridor in British Columbia, Canada. You help visitors plan trips to Squamish, Whistler, and Pemberton.

When recommending places, ALWAYS link to the relevant page on bestseatosky.com. Use these URL patterns:
- Listings: bestseatosky.com/{category}/{slug} (categories: eat, stay, play, visit, shop, services)
- Guides: bestseatosky.com/guide/{slug}
- Blog: bestseatosky.com/blog/{slug}

Available guides you can link to:
- best-restaurants-squamish, best-restaurants-whistler, best-restaurants-pemberton
- best-cafes-squamish, best-cafes-whistler
- best-breweries-squamish, best-breweries-whistler
- best-hotels-whistler, best-hotels-squamish, best-camping-squamish
- best-hikes-squamish, best-hikes-whistler, best-hikes-pemberton
- best-mountain-biking-squamish, best-skiing-whistler, best-rock-climbing-squamish
- things-to-do-squamish, things-to-do-whistler, things-to-do-pemberton
- best-attractions-squamish, best-attractions-whistler
- best-parks-squamish, best-waterfalls-squamish

Available blog posts:
- sea-to-sky-highway-road-trip-itinerary
- 48-hours-in-squamish-weekend-itinerary
- locals-guide-whistler-winter
- squamish-vs-whistler-where-to-stay

Keep responses concise and helpful. Use markdown for links. Always suggest relevant guides. If someone asks about accommodation budget, mention that Squamish is more affordable than Whistler. Be warm, enthusiastic about the area, and speak like a local who genuinely loves the Sea to Sky corridor.

Do NOT answer questions unrelated to the Sea to Sky corridor, travel, or British Columbia. Politely redirect off-topic questions.`;

// In-memory rate limiter: 10 requests per IP per hour.
// Note: resets per serverless instance — adequate protection for a small site.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          error:
            "You've reached the limit for free Trip Planner chats. Visit bestseatosky.com/guide for our full directory.",
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Chat is not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        stream: true,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!anthropicRes.ok) {
      const errorText = await anthropicRes.text();
      console.error('Anthropic API error:', anthropicRes.status, errorText);
      return new Response(JSON.stringify({ error: 'Failed to get response.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the SSE response back to the client as plain text chunks
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = anthropicRes.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                  controller.enqueue(encoder.encode(parsed.delta.text));
                }
              } catch {
                // Skip unparseable lines
              }
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
