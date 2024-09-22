import footerBg from '../assets/footerbg.jpg'
import Container from '../Components/ui/Container';
const Footer = () => {
  return (
    <Container>
    <footer className='text-white p-2 mb-[100px]' style={{background: `url(${footerBg})`}}>
        <h2>© 2012 Ministry of Foreign Affairs of Serbia. All rights reserved.</h2>
    </footer>
    </Container>
  );
};

export default Footer;
