import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase, getCurrentUser } from '@/lib/get-user';
import { Idea } from '@/types/idea';

// GET /api/ideas - Fetch all ideas
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ideas:', error);
      return NextResponse.json(
        { error: 'Failed to fetch ideas' },
        { status: 500 }
      );
    }

    // Transform database format to app format
    const ideas: Idea[] = (data || []).map((row) => ({
      id: row.id,
      text: row.text,
      tags: row.tags || [],
      createdAt: row.created_at,
      done: row.done || false,
      doneAt: row.done_at || undefined,
    }));

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/ideas - Create a new idea
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { text, tags } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const supabase = await getServerSupabase();
    const newIdea = {
      id: crypto.randomUUID(),
      text: text.trim(),
      tags: Array.isArray(tags) ? tags : [],
      created_at: new Date().toISOString(),
      done: false,
      done_at: null,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from('ideas')
      .insert([newIdea])
      .select()
      .single();

    if (error) {
      console.error('Error creating idea:', error);
      return NextResponse.json(
        { error: 'Failed to create idea' },
        { status: 500 }
      );
    }

    // Transform to app format
    const idea: Idea = {
      id: data.id,
      text: data.text,
      tags: data.tags || [],
      createdAt: data.created_at,
      done: data.done || false,
      doneAt: data.done_at || undefined,
    };

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
