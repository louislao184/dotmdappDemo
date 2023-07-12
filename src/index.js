import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Root from './pages/Root';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,redirect} from 'react-router-dom'

import View from './pages/View';
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Root/>,
      children:[
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "view/:id",
          element:<View/>,
          loader:async({params})=>{
            	
          const id = params.id;
          const listresponse = await fetch(`http://localhost:3001/notes/`);
          const list = await listresponse.json();
          const response = await fetch(`http://localhost:3001/notes/${id}`);
          const data = await response.json();
          return {
            id: id,
            list:list,
            data: data,
          };

          }
        },
        {
          path: "/create",
          element: <Create />,
          action: async ({ request }) => {
            const formData = await request.formData();
            const title = formData.get("title");
            const content = formData.get("content");
   
            const response = await fetch(`http://localhost:3001/notes`, {
              method: "post",
              body: JSON.stringify({
                title: title,
                content: content,
                datatime: new Date().toISOString(),
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
   
            return redirect(`/view/${data.id}`);
          },
        },
        {
          path: "/edit/:id",
          element: <Edit />,
          loader: async ({ params }) => {
            const id = params.id;
            const response = await fetch(`http://localhost:3001/notes/${id}`);
            const data = await response.json();
   
            return {
              id: id,
              data: data,
            };
          },
          action: async ({ request, params }) => {
            const id = params.id;
   
            const formData = await request.formData();
            const title = formData.get("title");
            const content = formData.get("content");
   
            const response = await fetch(`http://localhost:3001/notes/${id}`, {
              method: "put",
              body: JSON.stringify({
                title: title,
                content: content,
                datatime: new Date().toISOString(),
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
   
            return redirect(`/view/${data.id}`);
          },
        },
      ]
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
