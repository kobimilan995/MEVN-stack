import Home from '../components/pages/home.vue';
import About from '../components/pages/about.vue';
import Login from '../components/auth/login.vue';
import Register from '../components/auth/register.vue';
const routes = [
	{ path: '/home', component: Home },
	{ path: '/about', component: About },
	{ path: '/login', component: Login },
	{ path: '/register', component: Register },
]

export default routes;