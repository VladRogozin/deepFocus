import json

from django.shortcuts import render, get_object_or_404
from .models import Mix, MixRoom, MixAudio, Dialogue, Message, Character


def mix_list(request):
    # Получаем все миксы для отображения на главной странице
    mixes = Mix.objects.all()
    return render(request, 'lofi/mix_list.html', {'mixes': mixes})


import json
from django.shortcuts import render, get_object_or_404
from .models import Mix, MixAudio, MixRoom, Dialogue, Message


def mix_detail(request, mix_id):
    # Получаем микс по id и его аудиофайлы
    mix = get_object_or_404(Mix, id=mix_id)
    audios = MixAudio.objects.filter(mix=mix)

    # Получаем все комнаты, связанные с миксом
    rooms = MixRoom.objects.filter(mix=mix)

    # Получаем всех персонажей, связанных с этими комнатами
    characters = Character.objects.filter(room__in=rooms)

    # Сериализуем данные о комнатах для JSON
    rooms_data = []
    for room in rooms:
        dialogues = Dialogue.objects.filter(room=room)
        dialogues_data = []
        for dialogue in dialogues:
            messages = Message.objects.filter(dialogue=dialogue).order_by('id')
            messages_data = [{'name': message.name, 'message': message.message} for message in messages]
            dialogues_data.append({
                'thema': dialogue.thema,
                'messages': messages_data
            })

        rooms_data.append({
            'id': room.id,
            'description': room.description,
            'image': room.image.url if room.image else None,
            'dialogues': dialogues_data
        })

    # Сериализуем данные в JSON для передачи в шаблон
    rooms_json = json.dumps(rooms_data)

    return render(request, 'lofi/mix_detail.html', {
        'mix': mix,
        'audios': audios,
        'rooms': rooms,  # Передаем список объектов MixRoom в шаблон
        'rooms_json': rooms_json,  # Передаем также JSON данные
        'characters': characters,  # Передаем всех персонажей, связанных с комнатами
    })