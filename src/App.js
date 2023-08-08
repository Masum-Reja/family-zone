import TheLayout from "./viewer/theLayout/TheLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import AuthProvider from "./service/AuthProvider";
import SignIn from "./service/SignIn";
import Register from "./service/Register";
import useAuth from "./hooks/useAuth";

import TabPage from "./viewer/components/TabPage";
import AddFile from "./dashboard/AddFile";
import Header from "./viewer/common/Header";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import About from "./viewer/pages/About";
import ErrorPage from "./viewer/pages/ErrorPage";
import MyRooms from "./viewer/components/MyRooms";
import Gallary from "./viewer/route/gallery/Gallary";
import AddFamilyMember from "./viewer/route/roomMember/AddFamilyMember";
import Notes from "./viewer/route/notes/Notes";
import MyCalendar from "./viewer/route/calender/Calender";
import Message from "./viewer/route/message/Message";
import Contacts from "./viewer/route/contacts/Contacts";
import CreateRoom from "./dashboard/CreateRoom";
import PrivateRoute from "./route/PrivateRoute";
import MainPage from "./viewer/theLayout/MainPage";
import { Fragment } from "react";
import Tab from "./viewer/components/Tab/Tab";

function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <ChatContextProvider>
            <AuthProvider>
              <Header />
              <Routes>
                <Route path="/" element={<TheLayout />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/create-room" element={<CreateRoom />} />

                <Route path="/about" element={<About />} />
                <Route path="/calender" element={<MyCalendar />} />
                <Route path="/add-files" element={<AddFile />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/my-room" element={<MyRooms />} />

                <Route
                  path="/gallery/:id"
                  element={
                    <PrivateRoute>
                      <Gallary />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/contacts/:key"
                  element={
                    <PrivateRoute>
                      <Contacts />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/messages"
                  element={
                    <PrivateRoute>
                      <Message />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/notes/:key"
                  element={
                    <PrivateRoute>
                      <Notes />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/members/:key"
                  element={
                    <PrivateRoute>
                      <AddFamilyMember />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/add-files/:id"
                  element={
                    <PrivateRoute>
                      <AddFile />
                    </PrivateRoute>
                  }
                ></Route>
              </Routes>
            </AuthProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
