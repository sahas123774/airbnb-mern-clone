import {
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard
  from './pages/Dashboard';

import MainLayout
  from './layouts/MainLayout';

import ProtectedRoute
  from './components/ProtectedRoute';

import AddProperty
  from './pages/AddProperty';

import PropertyDetails
  from './pages/PropertyDetails';

import EditProperty
  from './pages/EditProperty';

import Bookings
  from './pages/Bookings';

import Favorites
  from './pages/Favorites';
  
import HostRoute from './components/HostRoute';

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <MainLayout>
            <Signup />
          </MainLayout>
        }
      />

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <HostRoute>

             <MainLayout>

               <Dashboard />

             </MainLayout>

            </HostRoute>

          </ProtectedRoute>

        }

      />

      <Route

       path="/add-property"

        element={
       
          <ProtectedRoute>

            <HostRoute>

             <MainLayout>

               <AddProperty />

             </MainLayout>

            </HostRoute>

          </ProtectedRoute>
        

       }

      />
      <Route

       path="/property/:id"

       element={

       <MainLayout>

        <PropertyDetails />

       </MainLayout>

       }

      />

      <Route

       path="/edit-property/:id"

       element={

        <ProtectedRoute>

        <MainLayout>

         <EditProperty />

        </MainLayout>

        </ProtectedRoute>

      }

      />

      <Route

       path="/bookings"

       element={

      <ProtectedRoute>

         <MainLayout>

          <Bookings />

        </MainLayout>

      </ProtectedRoute>

      }

     />

     <Route

      path="/favorites"

      element={

       <ProtectedRoute>

       <MainLayout>

        <Favorites />

      </MainLayout>

      </ProtectedRoute>

      }

     /> 

    </Routes>

  );
}

export default App;