
import './App.css'
import AllProducts from './components/AllProducts'
import HomePageProducts from './components/HomePageProducts'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()


function App() {


  return (
    
     <QueryClientProvider client={queryClient}>
    <HomePageProducts />
    <AllProducts />
    </QueryClientProvider>
    
  )
}

export default App
