import App, { AppProps } from 'next/app';
import api from '../api';
import Header from '../components/Header';
import '../styles/global.scss';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

interface AppCustomProps extends AppProps {
  categories: Array<string>;
}

function MyApp({ Component, pageProps, router, categories }: AppCustomProps) {
  return (
    <>
      <Header categories={categories} />
      <Component {...pageProps} />
    </>);
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { data } = await api.get("/products/categories");
  return { ...appProps, categories: data }
};


export default MyApp
