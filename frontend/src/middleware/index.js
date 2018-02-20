import RedirectIfAuthorized from './RedirectIfAuthorized'
import RedirectIfUnAuthorized from './RedirectIfUnAuthorized'

export default function middleware(router) {
	RedirectIfAuthorized(router);
	RedirectIfUnAuthorized(router);
}
