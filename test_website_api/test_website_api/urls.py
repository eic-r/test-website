"""
URL configuration for test_website_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
#from .views import LoginAPIView, LogoutAPIView

from test_app import views

urlpatterns = [
    path('accounts/login/', views.LoginAPIView.as_view(), name='login'),
    path('accounts/logout/', views.LogoutAPIView.as_view(), name='logout'),
    path('accounts/register/', views.RegisterView.as_view(), name='register'),
    path('api/v1/get/', views.get_tests),
    path('api/v1/put', views.put_test),
    path('api/v1/delete', views.delete_test),
    path('admin/', admin.site.urls),
]
