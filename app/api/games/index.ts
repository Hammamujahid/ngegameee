import { createClient } from '@/utils/supabase/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const supabase = createClient();
    const { data, error } = await supabase.from('game').select('*');
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
