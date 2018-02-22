export default function RedirectIfUnAuthorized(router) {
	router.beforeEach((to, from, next) => {
		console.log('asd',to.meta.auth);
		let token = localStorage.getItem('jwt');
		if((!token) && (to.meta.auth == true)) {
			next({path: '/login'});
		} else {
			next();	
		}	
	});
}