import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import PostFormPage from "./pages/PostFormPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/posts/:id" element={<PostPage/>}/>
                <Route path="/posts/new" element={<PostFormPage/>}/>
                <Route path="/posts/edit/:id" element={<PostFormPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}