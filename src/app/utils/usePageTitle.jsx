import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITLE_MAP = {
  '/': 'Главная страница',
  '/d': '',
};

export function usePageTitle(basename = '') {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = basename && pathname.startsWith(basename)
      ? pathname.slice(basename.length) || '/'
      : pathname;

    const title = TITLE_MAP[path] || 'it-cube.web';
    document.title = title;
  }, [pathname, basename]);
}