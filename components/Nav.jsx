'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {

const {data :session}= useSession();

const [providers,setProviders]=useState(null);
const [toggleDropDown,setToggleDropDown] =useState(false);




useEffect(() => {
const setUpProvider = async ()=>{
  const res =await getProviders();

  setProviders(res)
}
setUpProvider()
}, [])
console.log(session?.user.id);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
<Link href="/" className="flex gap-2 flex-center">
<Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>PromptBar</p>

</Link>


{/* desktop navigation */}
<div className="sm:flex hidden">
    {session?.user ? (
<div className="gap-3 flex md:gap-5">
<Link href="/create-prompt" className="black_btn">
Create Post
  </Link>
<button type="button" onClick={signOut}
className="outline_btn"
>
  Sign Out
</button>
<Link href="/profile">
<Image src={session?.user.image} alt="user"
  width={37}
  height={37}
  className='rounded-full'
/>
</Link>
</div>

        ):(
          <>
{
  providers &&  Object.values(providers).map((provider)=>(
<button 
type='button'
key={provider.name}
onClick={ ()=> signIn(provider.id)}
className='black_btn'
>
  Sign In
</button>


  ))
}


          </>  
        )
    }
</div>

{/* mobile nav */}

<div className='sm:hidden flex'>
{
  session?.user ? (
<div className="flex">
<Image
        src={session?.user.image} 
          alt='logo'
          width={30}
          height={30}
          className='object-contain cursor-pointer'
       onClick={()=>{setToggleDropDown((prev)=> !prev)}}
       
       />
       {
        toggleDropDown  && (
          <div 
          className="dropdown">
<Link href="/profile"
className="dropdown_link"
onClick={()=> setToggleDropDown(false)}
>
My Profile
</Link>
<Link href="/create-prompt"
className="dropdown_link"
onClick={()=> setToggleDropDown(false)}
>
Create Prompt
</Link>
<button 
type="button"
onClick={()=>{
  setToggleDropDown(false);
  signOut();
}}
className="mt-5 w-full black_btn "
>
Sign Out
</button>
          </div>
        )
       }
</div>
  ):(
    <>
{
  providers && Object.values(providers).map((provider)=>(
<button 
type='button'
key={provider.name}
onClick={()=> signIn(provider.id)}
className='black_btn'
>
  Sign In
</button>


  ))
}

    </>
  )
}
</div>


    </nav>
  )
}

export default Nav

