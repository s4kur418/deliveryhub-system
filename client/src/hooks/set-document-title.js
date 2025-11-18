import { useEffect } from 'react';

const setDocumentTitle = (title) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

export default setDocumentTitle;