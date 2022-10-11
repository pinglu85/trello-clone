import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../Home';
import BoardComponent from '../BoardComponent';

const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:id" element={<BoardComponent />} />
      </Routes>
    </Layout>
  );
};

export default App;
