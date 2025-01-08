import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AudioProvider from './utils/audioProvider'; 
import PrivateRoute from './PrivateRoute'; 
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signin';
import Posts from './pages/Posts';
import Post from './pages/Post';
import MakePost from './pages/MakePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import Password from './pages/auth/Password';
import Landing from './pages/Landing';

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* 보호된 라우트 */}
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/make"
            element={
              <PrivateRoute>
                <MakePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/edit"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/password"
            element={
              <PrivateRoute>
                <Password />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;
