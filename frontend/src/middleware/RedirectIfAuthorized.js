export default function RedirectIfAuthorized(router) {
	router.beforeEach((to, from, next) => {
		let token = localStorage.getItem('jwt');
		if((token) && (to.name == 'login' || to.name == 'register')) {
			next({path: '/home'});
		} else {
			next();	
		}
		
	});
}