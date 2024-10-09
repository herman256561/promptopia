"use client";
import { SessionProvider } from 'next-auth/react';

/*
Using the supplied <SessionProvider> allows instances of useSession() to 
share the session object across components, by using React Context under the hood. 
It also takes care of keeping the session updated and synced between tabs/windows.
*/

// This Provider component will wrap all the tags within the <body> tag, including navigation bar.
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider