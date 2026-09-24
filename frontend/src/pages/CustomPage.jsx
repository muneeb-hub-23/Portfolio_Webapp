import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import CustomPageFrame from '../components/CustomPageFrame';

export default function CustomPage() {
  const { pathname } = useLocation();
  const [state, setState] = useState({ path: pathname, loading: true });
  useEffect(() => {
    let active = true;
    setState({ path: pathname, loading: true });
    api.get('/custom-pages/public', { params: { path: pathname } }).then(({ data }) => {
      if (active) setState({ path: pathname, page: data });
    }).catch((error) => {
      if (active) setState({ path: pathname, error: error.response?.status === 404 ? 'Page not found' : 'Unable to load this page. Please try again.' });
    });
    return () => { active = false; };
  }, [pathname]);
  useEffect(() => {
    if (!state.page) return;
    const previous = document.title;
    document.title = state.page.title;
    return () => { document.title = previous; };
  }, [state.page]);
  if (state.loading || state.path !== pathname) return <p className="p-8 text-center">Loading page…</p>;
  if (state.error) return <main className="p-8 text-center space-y-4"><h1 className="text-2xl">{state.error}</h1><Link to="/" className="btn-primary inline-block">Back to home</Link></main>;
  return <CustomPageFrame title={state.page.title} content={state.page.content} />;
}
