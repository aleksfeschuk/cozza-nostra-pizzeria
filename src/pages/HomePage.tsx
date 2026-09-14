import  Header  from '../components/Header';
import Hero from '../components/Hero';
import MenuCarousel from '../components/MenuCarousel';
import About from '../components/About';
import Features from '../components/Features';
import CtaBanner from '../components/CtaBanner';
import Reviews from '../components/Reviews';
import HoWItWorks from '../components/HowItWorks';
import LateHours from '../components/LateHours';
import Footer from '../components/Footer';

export default function HomePage () {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <MenuCarousel />
                <About />
                <Features />
                <CtaBanner />
                <Reviews />
                <HoWItWorks />
                <LateHours />
            </main>
            <Footer />
        </>
    )
}