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

