from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Chapter, Modul


def chapter_list(request):
    chapters = Chapter.objects.all()
    return render(request, 'dialog/dialog.html', {'chapters': chapters})


def chapter_detail(request, chapter_id):
    chapter = get_object_or_404(Chapter, id=chapter_id)
    return render(request, 'dialog/chapter_detail.html')


def modul_list(request):
    moduls = Modul.objects.all()
    return render(request, 'dialog/modul_list.html', {'moduls': moduls})


def modul_detail(request, modul_id):
    modul = get_object_or_404(Modul, id=modul_id)
    chapters = modul.chapters.all()
    return render(request, 'dialog/modul.html', {'chapters': chapters})


def get_test_data(test):
    if test is None:
        return None
    return {
        'title': test.title,
        'antwort': test.antwort,
        'variant_1': test.variant_1,
        'variant_2': test.variant_2,
        'variant_3': test.variant_3,
    }


def chapter_detail_api(request, chapter_id):
    chapter = get_object_or_404(Chapter, id=chapter_id)
    dialogue_elements = chapter.dialogue_elements.all()

    elements = []
    for element in dialogue_elements:
        elements.append({
            'type_element': element.type_element,
            'sentence': element.sentence,
            'translation': element.translation,
            'image': element.image.url if element.image else None,
            'audio': element.audio.url if element.audio else None,
            'test': get_test_data(element.test),
        })

    data = {
        'title': chapter.title,
        'description': chapter.description,
        'dialogue_elements': elements
    }

    return JsonResponse(data)