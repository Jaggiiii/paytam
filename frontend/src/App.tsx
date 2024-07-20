
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Appbar } from './pages/Appbar'
import { Sendmoney } from './pages/sendmoney'
import { Main } from './pages/mainblock'
import { Balance } from './pages/balance'
import { History } from './pages/history'
import { PaymentDone } from './pages/paymentdone'
import { Delete } from './pages/delete'
import { Update } from './pages/update'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={'/signup'} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/appbar' element={<Appbar />} />
          <Route path='/send' element={<Sendmoney />} />
          <Route path='/main' element={<Main />} />
          <Route path='balance' element={<Balance />} />
          <Route path='/history' element={<History />} />
          <Route path='/paymentbox' element={<PaymentDone />} />
          <Route path='/delete' element={<Delete />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
