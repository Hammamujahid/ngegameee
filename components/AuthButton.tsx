'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function AuthButton() {
  // Definisikan state user dengan tipe User atau null
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);  // Pastikan tipe User atau null
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}
      <button onClick={handleSignOut} className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </div>
  ) : (
    <Link href="/login" className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}
