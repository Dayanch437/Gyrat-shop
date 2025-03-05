from django.urls import path, include






urlpatterns = [
    path('gyrat/',include('api.products.urls')),

]

