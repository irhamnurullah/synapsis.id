import { Fragment } from 'react';
import Sidebar from '@/components/sidebar';
import Layout from '@/layout/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Layout middle={<Component {...pageProps} />} left={<Sidebar />} />
    </Fragment>
  );
}
