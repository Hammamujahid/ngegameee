import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from('game').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { title, description, image_logo, image_thumbnail, min_req, size, release_year, download_url } = await request.json();

  const { error } = await supabase.from('game').insert([{
    title,
    description,
    image_logo,
    image_thumbnail,
    min_req,
    size: parseInt(size, 10),
    release_year,
    download_url
  }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Game added successfully' }, { status: 200 });
}
