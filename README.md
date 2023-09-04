# expense_tracker
1. created requirements.txt
2. .gitignore is created
3. python-decouple library for secret key management; if this library doesnt work properly in prod use os.environ[]

4. design Patterns, Follow Rest API best practices, jwt tokens, token expiry, Pagination, Caching, DB optimization - sharding, indexing; 
5. Django models - selct_related, prefecth_related, F(), groupby, aggregations ...
6. .schema --indent app_tablename -> schema
7. Exceptional handling
8. file storage system - images/year/month/day
9. learn abour decorators - use decorators to log times and cache data for ex: when user requests for his expenses in the month of april twice
10. use asyncio
11. Each time a request is made to the backend for a resource, the server should check for JWT token, its expiry(ask for login again), its legitimacy(if it got tampered)(ask for login again).

when a user create event is triggered,
1. generate UUID
2. add to appropriate group
3. generate a JWT token - whenever a new user is created, it should generate JWT
4. login him into their account

Tables
1. user porfiles
2. Login with jwt - if jwt token expired, delete it from the DB
3. reset password
4. invitations to register

5. expenses types
6. expenses
7. requests for resending proofs


Validations
1. Email - other choice => from email_validator import validate_email, EmailNotValidError
2. password - used builtin method for now, but later on hashpassword manully by storing its salt and key
3. phone - used regular expressions

DJANGO
1. from django.contrib.auth.hashers import make_password()
2. def create(self, validated_data): pass -> overrides to change password into hash
3. Use Authenticate, permission, sessions, all backend stuff
4. 

JWT with Httponly:
1. cors - setup
  1. CORS_ALLOWED_ORIGINS = [] # list of all allowed origins
  2. CORS_ALLOW_CREDENTIALS = True => for allowing requests with {withCredentials: true} header
  3. CORS_ORIGIN_ALLOW_ALL = True
  4. CORS middleware -  "corsheaders.middleware.CorsMiddleware"
2. Both frontend and backend should be on the same domain - localhost, localhost or 127.0.0.1, 127.0.0.1
3. Used cookie settings while setup - response.set_cookie(key='jwt', value=token, secure=False, httponly=True, samesite='Lax')
4. when react makes request to the backend with '{withCredentials:true}' header, after django receives request, it retrieves the token from the cookies from the response object.
5. this token should then be validated by checking its expiration and if tampered? 
6. if token is good, then send the requested resourses
7. if not, if expired or invalid(error occured and redirect him to login), let the user know to login
8.  Below lines might be helpful, 
response = HttpResponse(status=200)
response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
response['Access-Control-Allow-Credentials'] = 'true'


# React
1. Install React and create react app
npx create-react-app portfolio2
2. Install tailwind css and framer-motion
npm install -D tailwindcss framer-motion
for tailwind config file - npx tailwindcss init
add this to content block in tailwindcss.config - "./src/**/*.{js,jsx,ts,tsx}"
3. add these lines to index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 0;
}
4. To use fa fa- classes for icons
npm install @fortawesome/fontawesome-free
5. if we use scrollYprogress with refs, it returns the position of the ref by using scrollYprogress.get()
6. map, reduce, find, indexOf, forEach, setTimeOut

React router
1. BrowserRouter, route for each component like users, expenses
2. <Outlet /> - for displaying child components
3. <Outlet context /> - context for passing props to child comps - useOutletContext() is used to retrieve props data
4. <Link to='' /> - internal routing just like <a href=''>
5. useNavigate() - redirection
6. useParams() - to get parameters in the url
7. useHistory(), useLocation() - different routing options

 - Prop drilling, dirty checks