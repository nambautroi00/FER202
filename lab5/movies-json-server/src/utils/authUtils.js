// Helper function để kiểm tra quyền admin
export const isAdmin = (user) => {
  return user && user.role === 'admin';
};

// Helper function để kiểm tra quyền user
export const isUser = (user) => {
  return user && user.role === 'user';
};

