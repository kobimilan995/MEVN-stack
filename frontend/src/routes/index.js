import Home from '../components/pages/home.vue';
import About from '../components/pages/about.vue';
import Post from '../components/pages/post.vue';
import Login from '../components/auth/login.vue';
import Register from '../components/auth/register.vue';
const routes = [
	{ name:'home', path: '/home', component: Home },
	{ name:'about',path: '/about', component: About, meta: {
		auth: true
	} },
	{ name:'login',path: '/login',  component: Login },
	{ name:'register', path: '/register', component: Register },
	{ name:'post', path: '/post/:postId', component: Post, props: true}
]

export default routes;