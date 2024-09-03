export const trackPageVisit = async (pageName) => {
  const access = localStorage.getItem('access');
  if (access) {
    try {
      await fetch('https://creatorgiveaways.world/api/track_activity/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify({ activity_type: 'page_visit', details: { page: pageName } }),
      });
    } catch (error) {
      console.error('Error tracking page visit:', error);
    }
  }
};