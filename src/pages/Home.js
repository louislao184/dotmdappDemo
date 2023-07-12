import {Form,Link,NavLink,useLocation,useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';
import NoteList from "./NoteList";

const Home = ()=>{

return (
    <>
<nav class="bg-slate-800 py-2">
  <div class="container mx-auto flex items-center justify-between">
    <a href="#" class="text-2xl font-bold text-white">
      dotMD
    </a>

    <NavLink to="/create" className="text-md text-white">
      Create
    </NavLink>
  </div>
</nav>

<div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-1/3 pr-2">
          <NoteList />
        </div>
 
        <div className="w-1/2 md:w-2/3 px-4 text-md"></div>
      </div>


</>
);
};
export default Home;