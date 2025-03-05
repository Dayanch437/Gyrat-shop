from rest_framework import serializers
from apps.products.models import Product,Category,Banner,Image
from django.conf import settings
from django.core.mail import send_mail
from datetime import datetime
from django.template.loader import render_to_string
from django.core.cache import cache
from random import randint

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price','images',"description","type", 'category', 'images',"image"]


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields =['id', 'name', 'products']

class SimpleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id','title','image','sub_title']

































class ContactSerializer(serializers.Serializer):
    username = serializers.CharField()
    gmail = serializers.EmailField()
    comment = serializers.CharField()

    def save(self):
        verification_code = str(randint(100000, 999999))
        print(verification_code)
        gmail = self.validated_data['gmail']

        # Cache the verification data
        cache.set(
            f'verification_{gmail}',
            {
                'code': verification_code,
                'username': self.validated_data['username'],
                'comment': self.validated_data['comment'],
            },
            timeout=600,  # Cache timeout in seconds
        )
        code = verification_code
        current_time = datetime.now().year
        html_content = render_to_string(
            "emails/user_verification.html",
            {
                "code": code,
                "current_year": current_time,
            }
        )
        send_mail(
            'Email Verification Code',
            f'Your verification code is: {verification_code}',
            settings.DEFAULT_FROM_EMAIL,
            (gmail,),
            html_message=html_content,
            fail_silently=False,
        )

class ContactVerificationSerializer(serializers.Serializer):
    gmail = serializers.EmailField()
    verification_code = serializers.CharField(max_length=6)
