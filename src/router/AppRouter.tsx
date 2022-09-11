import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PagesTransition from '../components/layout/PagesTransition';

const RootRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <PagesTransition />
    </BrowserRouter>
  );
};
export default RootRouter;
