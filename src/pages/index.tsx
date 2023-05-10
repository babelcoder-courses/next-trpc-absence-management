import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

interface UseLifeCycleHookProps {
  onMount: () => void;
  onUnmount: () => void;
}

const useLifecycleHooks = ({ onMount, onUnmount }: UseLifeCycleHookProps) => {
  useEffect(() => {
    onMount();

    return () => onUnmount();
  }, [onMount, onUnmount]);
};

const IndexPage = () => {
  useDocumentTitle('Page Title');
  useLifecycleHooks({
    onMount: () => console.log('mounted!'),
    onUnmount: () => console.log('unmounting!'),
  });

  return <div></div>;
};

export default IndexPage;
