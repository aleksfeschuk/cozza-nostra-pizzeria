import  Header  from '../components/Header';
import Hero from '../components/Hero';
import MenuCarousel from '../components/MenuCarousel';
import About from '../components/About';
import Features from '../components/Features';
import CtaBanner from '../components/CtaBanner';

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
            </main>
        </>
    )
}