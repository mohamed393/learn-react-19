import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import About from "./pages/about";
import Contact from "./pages/contact";
import Layout from "./components/layout/layout.tsx";
import Blog from "./pages/blog";
import Post from "./pages/post";
import PageNotFound from "./components/pageNotFound.tsx";
import AuthGuard from "./components/AuthGuard.tsx";
// by adding index means main route
createRoot(document.getElementById('root')!).render(<StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<AuthGuard/>}>
            <Route path='/' element={<Layout/>}>
           <Route index element={<App/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='blog' element={<Blog/>}/>
            <Route path='blog/:id' element={<Post/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
            </Route>/
        </Routes>
    </BrowserRouter>
</StrictMode>,)
