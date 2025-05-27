import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Home, About, Contact } from '../pages/Index';

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);






// function routes() {

//     // that was Old v6 code 
//     return (
//         <>
//             <Routes>
//                 <Route path="/" element={<Layout />}>
//                     <Route index element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                 </Route>
//             </Routes>
//         </>
//     )
// }

export default routes