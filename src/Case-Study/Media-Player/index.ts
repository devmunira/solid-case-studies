// ### Media Player

// **Background:** A media player handles different media types like audio and video files. It has a `MediaFile` base class with common methods (`play`, `pause`, `stop`), while `AudioFile` and `VideoFile` subclasses may have additional needs (e.g., subtitles for video). The player should manage any file type seamlessly without extra conditions.

// DTOs and Models

interface MediaMetadata {
  id: string;
  title: string;
  duration: number;
  fileSize: number;
  format: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  album: string;
  artist: string;
}

interface AudioMetadata extends MediaMetadata {
  bitrate: number;
  sampleRate: number;
  channels: number;
}

interface VideoMetadata extends MediaMetadata {
  width: number;
  height: number;
  frameRate: number;
  hasSubtitles: boolean;
}

interface Subtitle {
  id: string;
  language: string;
  content: string;
  startTime: number;
  endTime: number;
}

// ================================================

// Interfaces
interface IMediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
  seek(position: number): void;
  getCurrentPosition(): number;
  getDuration(): number;
  getMetadata(): MediaMetadata;
}

interface IAudioPlayer extends IMediaPlayer {
  setVolume(volume: number): void;
  getVolume(): number;
  setEqualizer(preset: string): void;
}

interface IVideoPlayer extends IMediaPlayer {
  setSubtitles(enabled: boolean): void;
  getSubtitles(): Subtitle[];
  setQuality(quality: string): void;
}

interface IMediaFile {
  load(): Promise<void>;
  unload(): void;
  isLoaded(): boolean;
}

interface IMediaFactory {
  createMediaPlayer(type: string, metadata: MediaMetadata): IMediaPlayer;
}

// ================================================

// Implementations
abstract class BaseMediaPlayer implements IMediaPlayer {
  protected isPlaying: boolean = false;
  protected currentPosition: number = 0;
  protected metadata: MediaMetadata;

  constructor(metadata: MediaMetadata) {
    this.metadata = metadata;
  }

  play(): void {
    this.isPlaying = true;
    // Implementation
  }

  pause(): void {
    this.isPlaying = false;
    // Implementation
  }

  stop(): void {
    this.isPlaying = false;
    this.currentPosition = 0;
    // Implementation
  }

  seek(position: number): void {
    this.currentPosition = position;
    // Implementation
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }

  getDuration(): number {
    return this.metadata.duration;
  }

  getMetadata(): MediaMetadata {
    return this.metadata;
  }
}

class AudioPlayer extends BaseMediaPlayer implements IAudioPlayer {
  private volume: number = 100;
  private equalizerPreset: string = "default";

  constructor(metadata: AudioMetadata) {
    super(metadata);
  }

  setVolume(volume: number): void {
    this.volume = volume;
    // Implementation
  }

  getVolume(): number {
    return this.volume;
  }

  setEqualizer(preset: string): void {
    this.equalizerPreset = preset;
    // Implementation
  }
}

class VideoPlayer extends BaseMediaPlayer implements IVideoPlayer {
  private subtitlesEnabled: boolean = false;
  private subtitles: Subtitle[] = [];
  private quality: string = "auto";

  constructor(metadata: VideoMetadata) {
    super(metadata);
  }

  setSubtitles(enabled: boolean): void {
    this.subtitlesEnabled = enabled;
    // Implementation
  }

  getSubtitles(): Subtitle[] {
    return this.subtitles;
  }

  setQuality(quality: string): void {
    this.quality = quality;
    // Implementation
  }
}

class MediaFactory implements IMediaFactory {
  createMediaPlayer(type: string, metadata: MediaMetadata): IMediaPlayer {
    switch (type.toLowerCase()) {
      case "audio":
        return new AudioPlayer(metadata as AudioMetadata);
      case "video":
        return new VideoPlayer(metadata as VideoMetadata);
      default:
        throw new Error(`Unsupported media type: ${type}`);
    }
  }
}

// Add type guards
function isAudioPlayer(player: IMediaPlayer): player is IAudioPlayer {
  return "setVolume" in player;
}

function isVideoPlayer(player: IMediaPlayer): player is IVideoPlayer {
  return "setSubtitles" in player;
}

// Main Service that orchestrates the process
class MediaPlayerService {
  private currentPlayer: IMediaPlayer | null = null;
  private mediaFactory: IMediaFactory;

  constructor(mediaFactory: IMediaFactory) {
    this.mediaFactory = mediaFactory;
  }

  loadMedia(type: string, metadata: MediaMetadata): void {
    this.currentPlayer = this.mediaFactory.createMediaPlayer(type, metadata);
  }

  play(): void {
    if (this.currentPlayer) {
      this.currentPlayer.play();
    }
  }

  pause(): void {
    if (this.currentPlayer) {
      this.currentPlayer.pause();
    }
  }

  stop(): void {
    if (this.currentPlayer) {
      this.currentPlayer.stop();
    }
  }

  seek(position: number): void {
    if (this.currentPlayer) {
      this.currentPlayer.seek(position);
    }
  }

  setVolume(volume: number): void {
    if (this.currentPlayer && isAudioPlayer(this.currentPlayer)) {
      this.currentPlayer.setVolume(volume);
    }
  }

  setSubtitles(enabled: boolean): void {
    if (this.currentPlayer && isVideoPlayer(this.currentPlayer)) {
      this.currentPlayer.setSubtitles(enabled);
    }
  }
}

// ================================================

// Client side usage
const mediaFactory = new MediaFactory();
const mediaPlayerService = new MediaPlayerService(mediaFactory);

// Example usage
const audioMetadata: AudioMetadata = {
  id: "1",
  title: "Sample Audio",
  duration: 180,
  fileSize: 1024 * 1024 * 5,
  format: "mp3",
  path: "/path/to/audio.mp3",
  createdAt: new Date(),
  updatedAt: new Date(),
  bitrate: 320,
  sampleRate: 44100,
  channels: 2,
  album: "Sample Album",
  artist: "Sample Artist",
};

mediaPlayerService.loadMedia("audio", audioMetadata);
mediaPlayerService.play();

const videoMetadata: VideoMetadata = {
  id: "2",
  title: "Sample Video",
  duration: 360,
  fileSize: 1024 * 1024 * 50,
  format: "mp4",
  path: "/path/to/video.mp4",
  createdAt: new Date(),
  updatedAt: new Date(),
  width: 1920,
  height: 1080,
  frameRate: 30,
  hasSubtitles: true,
  album: "Sample Album",
  artist: "Sample Artist",
};

mediaPlayerService.loadMedia("video", videoMetadata);
mediaPlayerService.play();
