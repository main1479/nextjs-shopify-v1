import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { ShopProvider } from '../context/ShopContext';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<ShopProvider>
			<Layout>
				<Component {...pageProps} key={router.asPath} />
			</Layout>
		</ShopProvider>
	);
}

export default MyApp;
