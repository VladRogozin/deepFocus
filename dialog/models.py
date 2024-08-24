from django.db import models


class Test(models.Model):
    title = models.CharField(max_length=100)
    antwort = models.CharField(max_length=100)
    variant_1 = models.CharField(max_length=100)
    variant_2 = models.CharField(max_length=100)
    variant_3 = models.CharField(max_length=100)


class Chapter(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    gram_description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/chapter/', blank=True, null=True)

    def __str__(self):
        return self.title


class Modul(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    chapters = models.ManyToManyField(Chapter, blank=True)  # Связь многие ко многим

    def __str__(self):
        return self.title




class DialogueElement(models.Model):
    ELEMENT_TYPE_CHOICES = [
        ('stories', 'Stories'),
        ('dialogue', 'Dialogue'),
    ]

    type_element = models.CharField(
        max_length=8,
        choices=ELEMENT_TYPE_CHOICES,
        default='stories',
    )
    chapter = models.ForeignKey(Chapter, related_name='dialogue_elements', on_delete=models.CASCADE)
    sentence = models.TextField()
    translation = models.TextField()
    audio = models.FileField(upload_to='audio/', blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.sentence

