import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/context/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';
import PostsPage from './pages/Post/PostsPage';
import PostPage from './pages/Post/PostPage';
import PostCreatePage from './pages/Post/PostCreatePage';
import PostEditPage from './pages/Post/PostEditPage';
import ProfilePage from './pages/User/ProfilePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PostsPage />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/posts/create" element={<PostCreatePage />} />
                        <Route path="/posts/:id/edit" element={<PostEditPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;