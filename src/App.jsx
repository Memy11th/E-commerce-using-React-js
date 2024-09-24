import './App.css'
import SignUp from './components/SignUp/SignUp'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import'../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import Products from './components/Products/Products'
import LogIn from './components/LogIn/LogIn'
import DataContextProvider from './context/dataContext'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import Error from './components/Error/Error'
import RecentProducts from './components/RecentProducts/RecentProducts'
import ProductDetails from './components/ProductDetails/ProductDetails'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './context/CartContext'
import UserCart from './components/UserCart/UserCart'
import { Toaster } from 'react-hot-toast'
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import AllOrders from './components/AllOrders/AllOrders'
import Wishlist from './components/Wishlist/Wishlist'
import  WishlistContextProvider   from './context/WishlistContext'




let clientQuery = new QueryClient();
let routing = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'register',element:<SignUp/>},
    {path:'login',element:<LogIn/>},
    {path:'wishlist',element:<Wishlist/>},
    {path:'cart',element:<ProtectedRoute><UserCart/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute> 
      <Products>
        <RecentProducts/>
        </Products> 
      </ProtectedRoute>},
      {path:'productdetails/:ID/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*',element:<Error/>},

    {path:'checkout',element:<ProtectedRoute><CheckoutForm/></ProtectedRoute>},

  ]}
])

function App() {
  
  return <>

<QueryClientProvider client={clientQuery}>
<ReactQueryDevtools initialIsOpen={false} />

<CartContextProvider>
  <WishlistContextProvider>

<UserContextProvider>
<DataContextProvider>

<RouterProvider router={routing}>

</RouterProvider>
<Toaster/>


</DataContextProvider>
</UserContextProvider>
</WishlistContextProvider>
</CartContextProvider>

</QueryClientProvider>


  </>
}

export default App
