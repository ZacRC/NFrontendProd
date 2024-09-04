export const checkAndRefreshToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return false;
  }

  // Check if the access token is expired (you may need to decode the JWT to check this)
  // For simplicity, we'll just try to use it and refresh if it fails

  try {
    const response = await fetch('https://creatorgiveaways.world/api/protected-route/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      return true;
    }

    // If the access token is invalid, try to refresh it
    const refreshResponse = await fetch('https://creatorgiveaways.world/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem('accessToken', data.access);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking/refreshing token:', error);
    return false;
  }
};