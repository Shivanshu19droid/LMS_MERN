import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from 'react-icons/bs';

function Footer(){

    const ccurrentDate = new Date();
    const year = ccurrentDate.getFullYear();

    return (
        <>
           <footer className = 'relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>
               <section className='text-lg'>
                Copyright {year} | All rights reserved
               </section>

               <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsFacebook />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsInstagram />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsLinkedin />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsTwitter />
                </a>
               </section>

           </footer>
        
        </>
    )
}

export default Footer;