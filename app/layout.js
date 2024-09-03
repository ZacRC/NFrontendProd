'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageVisit = async () => {
      const access = localStorage.getItem('access');
      if (access) {
        try {
          await fetch('https://creatorgiveaways.world/api/track_activity/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`,
            },
            body: JSON.stringify({ activity_type: 'page_visit', details: { page: pathname } }),
          });
        } catch (error) {
          console.error('Error tracking page visit:', error);
        }
      }
    };

    trackPageVisit();
  }, [pathname]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
