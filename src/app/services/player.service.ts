import { Injectable } from '@angular/core';
import { IMusica } from '../Interfaces/IMusica';
import { newMusica } from '../Common/factories';
import { BehaviorSubject} from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;
  
  constructor(private spotifyService: SpotifyService) { 
    this.obterMusicaAtual();
  }
  
  async obterMusicaAtual(){
    clearTimeout(this.timerId);
    
    //obtenho a musica
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
    
    // causo loop
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000)
  }

  definirMusicaAtual(musica: IMusica){
    this.musicaAtual.next(musica);
  }

  async voltarMusica() {
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }
  
}
