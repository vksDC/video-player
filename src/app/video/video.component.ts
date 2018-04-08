import { Component, ViewChild } from '@angular/core';
import { Repository } from "../models/repository";

@Component({
  selector: 'video-component',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent
{
  @ViewChild('videoRef') video;

  private readonly PLAY_URL = "'../../assets/img/play.png";
  private readonly PAUSE_URL = "'../../assets/img/pause.png";
  private readonly MUTE_URL = "'../../assets/img/mute.png";
  private readonly UNMUTE_URL = "'../../assets/img/unmute.png";

  togglePlayState: string = "Play";
  toggleMuteState: string = "Mute";
  togglePlayUrl: string = this.PLAY_URL;
  toggleMuteUrl: string = this.MUTE_URL;

  private readonly PROGRESS_BAR_WIDTH = 640;
  private readonly VOLUME_BAR_HEIGHT = 360;

  progressWidth: string = "0px";
  volumeHeight: string = this.VOLUME_BAR_HEIGHT + "px";
  volumeMarginTop: string = "0px";

  currentTime: string = "00:00";
  duration: string = "00:00";

  constructor(public repo: Repository)
  {

  }

  ngAfterViewInit()
  {
    this.video.nativeElement.addEventListener("loadedmetadata",
        (event) => this.loadedMetadata(event));

    this.video.nativeElement.addEventListener("timeupdate",
        (event) => this.currentTimeUpdate(event));

    this.video.nativeElement.addEventListener("ended",
        (event) => this.ended(event));
  }

  togglePlay()
  {
    if (this.video.nativeElement.paused == false)
    {
        this.video.nativeElement.pause();
        this.togglePlayState = "Play";
        this.togglePlayUrl = this.PLAY_URL;
    }
    else
    {
        this.video.nativeElement.play();
        this.togglePlayState = "Pause";
        this.togglePlayUrl = this.PAUSE_URL;
    }
  }

  back()
  {
    this.video.nativeElement.currentTime -= 10.0;
  }

  forward()
  {
      this.video.nativeElement.currentTime += 10.0;
  }

  isNotPossibleToTurnDown(): boolean
  {
    return this.video.nativeElement.volume == 0.0;
  }

  isNotPossibleToTurnUp(): boolean
  {
      return this.video.nativeElement.volume == 1.0;
  }

  turnDown()
  {
      this.changeVolume(this.video.nativeElement.volume - 0.1);
  }

  turnUp()
  {
      this.changeVolume(this.video.nativeElement.volume + 0.1);
  }

  private changeVolume(changeTo)
  {
    if (this.video.nativeElement.muted)
    {
      this.toggleMute();
    }
    
    if (changeTo > 1.0)
    {
      changeTo = 1.0;
    }
    else if (changeTo < 0.0)
    {
       changeTo = 0.0;
    }

    this.volumeHeight = this.VOLUME_BAR_HEIGHT * changeTo + 'px';
    this.volumeMarginTop = this.VOLUME_BAR_HEIGHT - (this.VOLUME_BAR_HEIGHT * changeTo) + 'px'; // esto es para que de la sensación de que el volumen baja, porque con esto baja el color.. sino subiría
    this.video.nativeElement.volume = changeTo;
  }

  toggleMute()
  {
    if (this.video.nativeElement.muted)
    {
      this.video.nativeElement.muted = false;
      this.toggleMuteState = "Mute";
      this.toggleMuteUrl = this.MUTE_URL;
    }
    else
    {
      this.video.nativeElement.muted = true;
      this.toggleMuteState = "Unmute";
      this.toggleMuteUrl = this.UNMUTE_URL;
    }
  }

  stop()
  {
    this.video.nativeElement.currentTime = 0;
    this.video.nativeElement.pause();
    this.clear();
  }

  private clear()
  {        
    this.togglePlayState = "Play";
    this.togglePlayUrl = this.PLAY_URL;
    this.progressWidth = "0px";
    this.currentTime = "00:00";
    this.duration = "00:00";
  }

  //EVENTS
  private ended(evt)
  {
    this.clear();
  }

  private loadedMetadata(evt) // salta cuando están cargados los metadatos del vídeo
  {
    this.clear();
    this.duration = this.video.nativeElement.duration.toFixed(2);
  }

  private currentTimeUpdate(evt)
  {
    this.currentTime = this.video.nativeElement.currentTime.toFixed(2);
    //if currentTime = 5 seconds and duration = 10 seconds. Being max = 640 => 5*640/10 = 320 that is, a half
    this.progressWidth = this.video.nativeElement.currentTime * 
      this.PROGRESS_BAR_WIDTH / this.video.nativeElement.duration + "px";
  }

  changePosition(evt)
  {
    //if offsetX = 320. Being max = 640 and duration = 10 seconds => 320*10/640 = 5 that is the current time of the video
    let newTime = evt.offsetX * this.video.nativeElement.duration / this.PROGRESS_BAR_WIDTH; //from size to seconds
    this.video.nativeElement.currentTime = newTime; //update the position of the video
    this.progressWidth = evt.offsetX + 'px'; //update the progress bar
  }
}