export interface Artist {
  id: number;
  name: string;
  img: string;
}

export interface Album {
  img: string;
  artist: string;
  title: string;
}

export interface MoreArtist {
  id: number;
  name: string;
  img: string;
}

export interface FirstCardProps {
  name: string;
  listeners: string;
}

export interface ArtistHere {
  id: number;
  name: string;
  img: string;
  listeners: string;
  songs: Song[];
}

export interface Song {
  id: number;
  title: string;
  plays: string;
  img: string;
  duration: string;
  audio: string;
  artistId: number;
}

export interface PlayerProps {
  currentSong: Song | null;
  onNext: () => void;
  onPrevious: () => void;
}
export interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
}
