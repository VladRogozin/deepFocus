from django.shortcuts import get_object_or_404
from .forms import SentenceForm
import random
import json
from django.shortcuts import render, redirect
from .models import Sentence, Word, Playlist
from .forms import SentenceFormSet, WordFormSet, PlaylistForm


def playlist_list(request):
    playlists = Playlist.objects.all()
    return render(request, 'sentences/playlist_list.html', {'playlists': playlists})


def add_playlist(request):
    if request.method == 'POST':
        form = PlaylistForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('sentences:playlist_list')
    else:
        form = PlaylistForm()
    return render(request, 'sentences/add_playlist.html', {'form': form})


def edit_playlist(request, playlist_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)
    sentences = playlist.sentences.all()
    words = playlist.words.all()

    if request.method == 'POST':
        # Удаление предложений
        sentence_ids_to_delete = request.POST.getlist('delete_sentences')
        Sentence.objects.filter(id__in=sentence_ids_to_delete).delete()

        # Удаление слов
        word_ids_to_delete = request.POST.getlist('delete_words')
        Word.objects.filter(id__in=word_ids_to_delete).delete()

        return redirect('sentences:playlist_list')

    return render(request, 'sentences/edit_playlist.html', {
        'playlist': playlist,
        'sentences': sentences,
        'words': words,
    })


def delete_playlist(request, pk):
    playlist = get_object_or_404(Playlist, pk=pk)
    if request.method == 'POST':
        playlist.delete()
        return redirect('sentences:playlist_list')
    return render(request, 'sentences/delete_playlist.html', {'playlist': playlist})


def add_sentence(request):
    if request.method == 'POST':
        sentence_formset = SentenceFormSet(request.POST, request.FILES, prefix='sentences')
        word_formset = WordFormSet(request.POST, request.FILES, prefix='words')

        if sentence_formset.is_valid() and word_formset.is_valid():
            sentence_formset.save()
            word_formset.save()
            return redirect('sentences:playlist_list')
        else:
            # Если есть ошибки валидации, выводим их для отладки
            print(sentence_formset.errors)
            print(word_formset.errors)
    else:
        sentence_formset = SentenceFormSet(queryset=Sentence.objects.none(), prefix='sentences')
        word_formset = WordFormSet(queryset=Word.objects.none(), prefix='words')

    return render(request, 'sentences/add_sentence.html', {
        'sentence_formset': sentence_formset,
        'word_formset': word_formset,
    })


def edit_sentence(request, pk):
    sentence = get_object_or_404(Sentence, pk=pk)
    if request.method == 'POST':
        form = SentenceForm(request.POST, instance=sentence)
        if form.is_valid():
            form.save()
            return redirect('sentences:playlist_list')
    else:
        form = SentenceForm(instance=sentence)
    return render(request, 'sentences/edit_sentence.html', {'form': form})


def delete_sentence(request, pk):
    sentence = get_object_or_404(Sentence, pk=pk)
    if request.method == 'POST':
        sentence.delete()
        return redirect('sentences:playlist_list')
    return render(request, 'sentences/delete_sentence.html', {'sentence': sentence})


def game(request, playlist_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)
    sentences = list(playlist.sentences.all())
    words = list(playlist.words.all())

    if not sentences and not words:
        return render(request, 'sentences/game.html', {'error': 'No elements in this playlist'})

    elements = []

    # Добавляем предложения
    for sentence in sentences:
        if random.randint(1, 10) <= 7 or not sentence.audio:
            elements.append({
                'type': 'sentence_order',
                'german_sentence': sentence.german_sentence,
                'translation': sentence.translation,
                'audio': sentence.audio.url if sentence.audio else None,
                'image': sentence.image.url if sentence.image else None
            })

        if random.randint(1, 10) <= 10 and sentence.audio:
            elements.append({
                'type': 'audio_sentence',
                'german_sentence': sentence.german_sentence,
                'translation': sentence.translation,
                'audio': sentence.audio.url if sentence.audio else None,
                'image': sentence.image.url if sentence.image else None
            })

    # Добавляем слова
    for word in words:
        random_number = random.randint(1, 10)
        if random_number % 2 == 0 or not word.audio:
            elements.append({
                'type': 'word_translation',
                'german_word': word.german_word,
                'translation': word.translation,
                'audio': word.audio.url if word.audio else None,
                'image': word.image.url if word.image else None
            })
        elif random_number <= 5:
            elements.append({
                'type': 'word_origin',
                'german_word': word.german_word,
                'translation': word.translation,
                'audio': word.audio.url if word.audio else None,
                'image': word.image.url if word.image else None
            })

        elif word.audio:
            elements.append({
                'type': 'audio_word_translation',
                'german_word': word.german_word,
                'translation': word.translation,
                'audio': word.audio.url if word.audio else None,
                'image': word.image.url if word.image else None
            })

    random.shuffle(elements)

    return render(request, 'sentences/game.html', {
        'elements': json.dumps(elements)  # Передаем данные в виде JSON
    })
