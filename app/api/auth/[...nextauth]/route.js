import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        try {
          const user = await User.findOne({ email: credentials.email }).select('+password');
          if (!user) throw new Error('Invalid credentials');
      
          const isMatch = await user.comparePassword(credentials.password);
          if (!isMatch) throw new Error('Invalid credentials');
      
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          };
        } catch (error) {
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };