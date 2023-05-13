import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getValidSubdomain } from './utils/subdomain'

// // RegExp for public files
// const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // // Clone the URL
  // const url = req.nextUrl.clone();

  // // Skip public files
  // if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('shop')) return;

  // const host = req.headers.get('host');
  // const subdomain = getValidSubdomain(host);
  // if (subdomain) {
  //   // Subdomain available, rewriting
  //   console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
  //   url.pathname = `/${subdomain}${url.pathname}`;
  // }
  // const res = NextResponse.rewrite(url)
  

  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client
  const supabase = createMiddlewareSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return res
}
