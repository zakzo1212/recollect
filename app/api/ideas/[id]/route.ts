import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Idea } from '@/types/idea';

// PATCH /api/ideas/[id] - Update an idea
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: any = {};
    
    if (body.text !== undefined) {
      updates.text = body.text.trim();
    }
    if (body.tags !== undefined) {
      updates.tags = Array.isArray(body.tags) ? body.tags : [];
    }
    if (body.done !== undefined) {
      updates.done = body.done;
      updates.done_at = body.done ? new Date().toISOString() : null;
    }

    const { data, error } = await supabase
      .from('ideas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating idea:', error);
      return NextResponse.json(
        { error: 'Failed to update idea' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
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

    return NextResponse.json(idea);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/ideas/[id] - Delete an idea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('ideas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting idea:', error);
      return NextResponse.json(
        { error: 'Failed to delete idea' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
