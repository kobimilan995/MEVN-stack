import Home from '../components/pages/home.vue';
import About from '../components/pages/about.vue';
import Post from '../components/pages/post.vue';
import Login from '../components/auth/login.vue';
import Register from '../components/auth/register.vue';
import Categories from '../components/pages/categories.vue';
import Category from '../components/pages/category.vue';
const routes = [
	{ name:'home', path: '/home', component: Home, meta: {auth: true} },
	{ name:'about',path: '/about', component: About, meta: {auth: true} },
	{ name:'login',path: '/login',  component: Login },
	{ name:'register', path: '/register', component: Register },
	{ name:'post', path: '/post/:postId', component: Post,meta: {auth: true}, props: true},
	{ name:'categories', path: '/categories/', component: Categories,meta: {auth: true}},
	{ name:'category', path: '/category/:categoryId', component: Category,meta: {auth: true}, props: true}
]

export default routes;