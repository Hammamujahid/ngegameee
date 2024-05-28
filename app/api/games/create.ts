import { createClient } from '@/utils/supabase/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const supabase = createClient();
    const { title, description, image_logo, image_thumbnail, min_req, size, release_year, download_url } = req.body;
    
    if (isNaN(parseInt(size, 10))) {
        return res.status(400).json({ error: 'Size must be a number' });
      }

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
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Game added successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
