
export class User {
  static async me() {
    const userData = localStorage.getItem('mockUser');
    if (!userData) {
      throw new Error('No authenticated user found');
    }
    return JSON.parse(userData);
  }

  static loginWithRedirect(redirectUrl, email = null, password = null) {
    if (!email || !password) {
      throw new Error('Email and password required');
    }
    if (password.length < 6) {
      throw new Error('Password too short');
    }

    const mockUser = {
      id: Date.now(),
      email: email.toLowerCase(),
      full_name: email.split('@')[0].replace(/\./g, ' ').replace(/^\w/, c => c.toUpperCase()),
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    window.location.href = redirectUrl;
  }

  static async logout() {
    localStorage.removeItem('mockUser');
  }
}
