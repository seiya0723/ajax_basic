from django.shortcuts import render


#TODO:ここでDRF仕様のビュークラスと通常のビュークラスを切り替え
from django.views import View
#from rest_framework.views import APIView as View

from django.http.response import JsonResponse
from django.template.loader import render_to_string

from .models import Topic
from .forms import TopicForm


from django.db.models.functions import Collate
from django.db.models import Value

class IndexView(View):

    def get(self, request, *args, **kwargs):

        topics  = Topic.objects.all()
        context = { "topics":topics }

        return render(request,"bbs/index.html",context)

    def post(self, request, *args, **kwargs):

        json    = { "error":True }
        form    = TopicForm(request.POST)

        if not form.is_valid():
            print("Validation Error")
            return JsonResponse(json)

        form.save()
        json["error"]   = False

        topics          = Topic.objects.all()
        context         = { "topics":topics }
        content         = render_to_string("bbs/content.html",context,request)

        json["content"] = content

        return JsonResponse(json)

    def delete(self, request, *args, **kwargs):
        
        json    = { "error":True }

        if "pk" not in kwargs:
            return JsonResponse(json)

        topic   = Topic.objects.filter(id=kwargs["pk"]).first()

        if not topic:
            return JsonResponse(json)

        topic.delete()
        json["error"]   = False

        return JsonResponse(json)

index   = IndexView.as_view()



