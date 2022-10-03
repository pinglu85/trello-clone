import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../Home';
import Board from '../Board';

const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </Layout>
  );
};

export default App;
