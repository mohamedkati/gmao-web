
/**
 * Configuration de l'authentification
 */
export const authConfig = {
  
  // Pages
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    me: '/auth/me',
    newUser: '/dashboard', // Redirect après inscription
  },

  // Session
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60, // 24 heures
  },

  // JWT
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Callbacks
  callbacks: {
    async signIn({ _user, _account, _profile }: any) {
      // Logique custom lors du sign in
      const user = _user;
      const acc = _account;
      const profile = _profile;
      console.log(user, acc, profile);
      return true;
    },

    async redirect({ url, baseUrl }: any) {
      // Logique de redirection
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },

    async jwt({ token, user }: any) {
      // Ajouter des infos custom au JWT
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
        token.tenantId = user.tenantId;
      }
      return token;
    },

    async session({ session, token }: any) {
      // Ajouter des infos custom à la session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },

  // Events
  events: {
    async signIn({ user }: any) {
      console.log('[Auth] User signed in:', user.email);
    },
    async signOut({ token }: any) {
      console.log('[Auth] User signed out', token);
    },
  },

  // Debug (dev only)
  debug: process.env.NODE_ENV === 'development',
};

export default authConfig;