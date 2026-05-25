import {
  Navigate
} from 'react-router-dom';

function HostRoute({ children }) {

  const role =
    localStorage.getItem(
      'role'
    );

  // BLOCK NON HOSTS
  if(role !== 'host'){

    return <Navigate to="/" />;

  }

  return children;

}

export default HostRoute;