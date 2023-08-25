# expense_tracker
### created requirements.txt
### .gitignore is created
### python-decouple library for secret key management; if this library doesnt work properly in prod use os.environ[]

### design Patterns, Follow Rest API best practices, jwt tokens, token expiry, Pagination, Caching, DB optimization - sharding, indexing; 
### Django models - selct_related, prefecth_related, F(), groupby, aggregations ...
### .schema --indent app_tablename -> schema
### Exceptional handling
### file storage system - images/year/month/day

when a user create event is triggered,
1. generate UUID
2. add to appropriate group
3. generate a JWT token - whenever a new user is created, it should generate JWT
4. login him into their account
