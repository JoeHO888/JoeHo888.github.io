---
date: "2019-05-11"
slug: "/blog-posts/pagination-in-django-detailview/"
title: "Pagination in Django detailView"
description: "Implement pagination in Django DetailView"
featuredImage: pagination-in-django-detailView.jpg
---
I was learning how to create a mini blog in Django from [a series of great tutorials](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django), it discuss the fundamental building blocks of Web Developement in Django.s

Django provides two elgant views, ListView and DetailView to display a list of single objects (e.g. post) and the detail of each object (e.g. comments of each object), this tutorial shares a way to do pagination on ListView, for example divide a list of 10 posts into 2 pages, and I would like to supplement more here, especially how to do pagination on DetailView, for example divide a list of comments of a blog into several pages.

We need to first get a list of related objects which we want to pagainate and show in DetailView and then pass in as a parameter, object_list, so that our template can access the object_list variable.

**View**:
```python
class BlogDetailView(generic.DetailView,MultipleObjectMixin):
    model = Blog
    paginate_by = 1

    def get_context_data(self, **kwargs):
        object_list = Comment.objects.filter(blog=self.object)
        context = super(BlogDetailView, self).get_context_data(object_list=object_list, **kwargs)
        context['form'] = CommentForm()
        return context
```

**Template**:
```python
class BlogDetailView(generic.DetailView,MultipleObjectMixin):
    model = Blog
    paginate_by = 1

    def get_context_data(self, **kwargs):
        object_list = Comment.objects.filter(blog=self.object)
        context = super(BlogDetailView, self).get_context_data(object_list=object_list, **kwargs)
        context['form'] = CommentForm()
        return context
```

**Result**:
![Pagination in Django detailView Result](../../images/pagination-in-django-detailview/result.jpg)
