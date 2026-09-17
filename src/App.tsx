import { useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import HomePage  from './pages/HomePage'
import { trackPageView } from './components/lib/analytics'
import CheckoutPage from './pages/CheckoutPage'
import CartProvider from './context/CartProvider'
import CartDrawer from './components/CartDrawer'


export default function App() {

    const location = useLocation()

    useEffect(() => {
        trackPageView(location.pathname)
    }, [location.pathname])

    return (

        <CartProvider>
            <Routes>
                <Route  path="/" element={<HomePage />} />
                <Route  path="/checkout" element={<CheckoutPage />} />
            </Routes>

            <CartDrawer />
        </CartProvider>
        
    )
}


