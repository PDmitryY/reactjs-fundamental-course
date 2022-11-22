import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { routes } from '../router/router'

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => 
        <Route path={route.path} element={<route.component/>} exact={route.exact}></Route>
      )}
    </Routes>
  )
}

export default AppRouter