import { Injectable } from "@angular/core";

import { Video } from "./video.model";

@Injectable()
export class Repository
{
    videos: Video[] = [];
    currentVideo: Video;

    constructor()
    {
        this.getVideos();
    }

    getVideos()
    {
        // aquí se mete el servicio REST para recuperar la info de los vídeos
        let video = new Video(1, "Big Buck Bunny", "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
        this.currentVideo = video;
        this.videos.push(video);
        this.videos.push(new Video(2, "Toy helicopter", "http://techslides.com/demos/sample-videos/small.mp4"));
        this.videos.push(new Video(3, "Toy Story", "http://www.html5videoplayer.net/videos/toystory.mp4"));
        this.videos.push(new Video(4, "Star trails", "http://mirrors.standaloneinstaller.com/video-sample/star_trails.mp4"));
        this.videos.push(new Video(5, "Subtítulos", "../../assets/video/videoplayback.mp4")); 
    }

    selectVideo(id: number)
    {
        this.currentVideo = this.videos.find(item => item.videoId == id);
    }
}