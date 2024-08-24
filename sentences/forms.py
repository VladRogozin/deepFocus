from django import forms
from .models import Sentence, Playlist, Word

from django.forms import modelformset_factory


class SentenceForm(forms.ModelForm):
    class Meta:
        model = Sentence
        fields = ['german_sentence', 'translation', 'image', 'audio', 'playlist']
        widgets = {
            'german_sentence': forms.TextInput(attrs={'class': 'form-control'}),
            'translation': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'audio': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'playlist': forms.Select(attrs={'class': 'form-control'}),
        }


class WordForm(forms.ModelForm):
    class Meta:
        model = Word
        fields = ['german_word', 'translation', 'image', 'audio', 'playlist']  # Добавлены image и audio


SentenceFormSet = modelformset_factory(Sentence, form=SentenceForm, extra=1)
WordFormSet = modelformset_factory(Word, form=WordForm, extra=1)

class PlaylistForm(forms.ModelForm):
    class Meta:
        model = Playlist
        fields = ['name']