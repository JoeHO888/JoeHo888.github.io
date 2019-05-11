---
title: How to do pagination in Django DetailView
categories:
- Django
- Web Development
excerpt: |
  A pot still is a type of still used in distilling spirits such as whisky or brandy. Heat is applied directly to the pot containing the wash (for whisky) or wine (for brandy).
feature_text: |
  ## The Pot Still
  The modern pot still is a descendant of the alembic, an earlier distillation device
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---

I was learning how to create a mini blog in Django from [a series of great tutorials](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django "A link"), it discuss the fundamental building blocks of Web Developement in Django. Django provides two elgant views, ListView and DetailView to display a list of single objects (e.g. post) and the detail of each object (e.g. comments of each object), this tutorial shares a way to do pagination on ListView, for example divide a list of 10 posts into 2 pages, and I would like to supplement more here, especially how to do pagination on DetailView, for example divide a list of comments of a blog into several pages.

We need to first get a list of related objects which we want to pagainate and show in DetailView and then pass in as a parameter, object_list, so that our template can access the object_list variable

View: 
``` 
class BlogDetailView(generic.DetailView,MultipleObjectMixin):
    model = Blog
    paginate_by = 1

    def get_context_data(self, **kwargs):
        object_list = Comment.objects.filter(blog=self.object)
        context = super(BlogDetailView, self).get_context_data(object_list=object_list, **kwargs)
        context['form'] = CommentForm()
        return context
```

Template: 
``` 
{% raw %}
{% for comment in object_list %}
  <hr>
  <p>{{comment.content}}</p>
  <p>By {{comment.commenter}}</p>
  <p>At {{comment.datetime}}</p>
{% endfor %} 
{% endraw %}

```

Result:
{% include figure.html image="/images/2019-05-11-DetailView-Pagination/capture.jpg" %}

