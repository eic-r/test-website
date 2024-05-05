# test_website
## frontend
Run `ng serve` in test_website_frontend to start the frontend. Access the website at localhost:4200. 

## backend
Use `python manage.py runserver localhost:8000` in test_website_api to test backend.

Authentication requires PostgreSQL server. Make sure the database connection information in test_website_api/test_website_api/settings.py is correct.

Material data is stored with MongoDB. Change the connection string in test_website_api/test_app/views.py as necessary.
