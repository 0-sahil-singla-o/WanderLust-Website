import Container from '@mui/material/Container';

export default function Footer(){
    return (
        <>
        <div className='footer' style={{backgroundColor:"rgba(0,0,0,0.1)"}}>
        <Container  maxWidth="sm">
                <div className="grid grid-rows-3 ">
                        <div className=' flex items-center justify-center py-[0.7rem]'>
                            <a href="#"><i className="fa-brands fa-square-facebook mx-2 text-black text-[1.3rem]"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram mx-2 text-black text-[1.3rem]"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin mx-2 text-black text-[1.3rem]"></i></a>
                        </div>
                        <div className='  flex items-center justify-center'><a href="#" className='text-black hover:underline no-underline'>WanderLust Private Limited</a></div>
                        <div className=' flex items-center justify-center'><a href="#" className='text-black hover:underline no-underline'>Privacy Terms</a></div>
                </div>
            </Container>
        </div>
            
        </>
    )
}