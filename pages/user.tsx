import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

export default function User({ user }: { user: User }) {
  return (
    <>
        <Link href="/"> Home </Link>
        <div> Hello { user.email } </div>
      <pre> { JSON.stringify(user, null, 2) } </pre>
    </>
    );
  }

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};
