export const Footer = () => {
    return(
        <footer className='bg-gray-900 text-gray-400 py-8 text-center'>
        <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-col justify-between items-center'>
            <p>© {new Date().getFullYear()} SpendWise. All rights reserved.</p>
            <div className='space-x-6 mt-4 md:mt-0'>
            <a href='#' className='hover:text-white transition'>About</a>
            <a href='#' className='hover:text-white transition'>Contact</a>
            <a href='#' className='hover:text-white transition'>Privacy Policy</a>
            </div>
        </div>
        </footer>
    )
}