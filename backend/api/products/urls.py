from rest_framework import routers


from .viewsets import (
    CategoryViewSet,
    ProductViewSet,
    BannerViewSet,
    ContactViewSet
)

urlpatterns = []


router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('products', ProductViewSet, basename='products')
router.register('banners', BannerViewSet, basename='banners')
router.register('contacts', ContactViewSet)


urlpatterns += router.urls


