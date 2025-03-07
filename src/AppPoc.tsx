import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserTable from './components/UserTable';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-8 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            User Management
          </h1>
          <UserTable />
        </div>
      </div>
    </Provider>
  );
}

export default App;
