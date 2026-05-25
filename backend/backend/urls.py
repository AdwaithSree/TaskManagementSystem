from django.contrib import admin

from django.urls import path, include

from django.http import HttpResponse

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# HOME PAGE

def home(request):

    return HttpResponse("""

    <html>

    <head>

        <title>TaskFlow Admin</title>

        <style>

            body{

                margin:0;

                height:100vh;

                display:flex;

                justify-content:center;

                align-items:center;

                background:#0b0f19;

                font-family:Arial;

                color:white;
            }

            .card{

                width:480px;

                background:#121826;

                padding:50px;

                border-radius:28px;

                text-align:center;

                box-shadow:0 0 40px rgba(0,0,0,0.4);
            }

            h1{

                font-size:42px;

                margin-bottom:16px;
            }

            p{

                color:#9ca3af;

                line-height:1.7;

                margin-bottom:34px;
            }

            a{

                text-decoration:none;

                background:#6d5dfc;

                color:white;

                padding:16px 28px;

                border-radius:16px;

                font-weight:600;

                display:inline-block;
            }

            a:hover{

                opacity:0.9;
            }

        </style>

    </head>

    <body>

        <div class="card">

            <h1>

                Welcome Admin

            </h1>

            <p>

                Manage your TaskFlow system
                professionally through the admin panel.

            </p>

            <a href="/admin/">

                Open Admin Panel

            </a>

        </div>

    </body>

    </html>

    """)


urlpatterns = [

    # HOME

    path(
        '',
        home
    ),

    # ADMIN

    path(
        'admin/',
        admin.site.urls
    ),

    # API

    path(
        'api/',
        include('tasks.urls')
    ),

    # JWT

    path(
        'api/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),

    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

]