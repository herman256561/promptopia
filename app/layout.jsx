import '@styles/globals.css';
import { Children } from 'react';
import Nav from "@components/Nav";
import Provider from "@components/Provider";


export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

/*A root layout is the top-most layout in the root app directory. 
It is used to define the <html> and <body> tags and other globally shared UI.

Layout components should accept and use a children prop. During rendering, 
children will be populated with the route segments the layout is wrapping.
*/


const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;