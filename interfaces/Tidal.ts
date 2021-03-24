import { Headers } from "node-fetch";


export interface LoginInfo {
  username: string;
  password: string;
  quality: "LOSSLESS" | "HIGH" | "LOW";
}

export interface RawResult {
  data: any | any[];
  responseHeaders: Headers;
}

export interface TidalAlbum {
  id: number,
  title: string,
  /**
   * in Seconds
   */
  duration: number,
  streamReady: boolean,
  streamStartDate: string,
  allowStreaming: boolean,
  premiumStreamingOnly: boolean,
  numberOfTracks: number,
  numberOfVideos: number,
  numberOfVolumes: number,
  /**
   * YYYY-MM-DD
   */
  releaseDate: string,
  copyright: string,
  type: string | 'ALBUM',
  version: unknown,
  url: string,
  cover: string,
  videoCover: unknown,
  explicit: boolean,
  upc: string,
  popularity: number,
  audioQuality: string | 'HI_RES',
  audioModes: string | "STEREO",
  artist: TidalArtistInfo,
  artists: TidalArtistInfo[]
}

export interface TidalArtistInfo {
  id: string;
  name: string;
  type: string | "MAIN";
}

export interface TidalArtistInfoFull {
  id: number,
  name: string,
  artistTypes: string[];
  url: string;
  picture: string;
  popularity: number;
  artistRoles: TidalArtistRole[];
  mixes: {
    [mixType: string]: string;
  }
}


export interface TidalArtistRole {
  categoryId: number;
  category: string;
}


export interface TidalBio {

  source: string,
  lastUpdated: string,
  text: string,
  summary: string

}

export interface TidalSimilarArtist extends TidalArtistInfo {
  artistTypes: string[],
  url: string,
  picture: string,
  popularity: number,
  banner: unknown,
  artistRoles: unknown,
  mixes: unknown,
  relationType: string | 'SIMILAR_ARTIST'
}


export interface TidalTrack {
  id: number;
  title: string;
  artists: TidalArtistInfo[];
  /**
   * Duration in seconds
   */
  duration: number;
  popularity: number;
  url: string;
  isrc: string;
}

export interface TidalVideo {
  id: number,
  title: string,
  volumeNumber: number,
  trackNumber: number,
  releaseDate: string,
  imagePath: unknown,
  imageId: string,
  duration: number,
  quality: string,
  streamReady: boolean,
  streamStartDate: string,
  allowStreaming: boolean,
  explicit: boolean,
  popularity: number,
  type: string | 'Music Video',
  adsUrl: unknown,
  adsPrePaywallOnly: boolean,
  artist: TidalArtistInfo,
  artists: TidalArtistInfo[],
  album: unknown
}

export interface TidalArrayResult<T> {
  limit: number;
  offset: number;
  totalNumberOfItems: number;
  items: T[]
}

export interface TidalSearchResult {
  artists?: TidalArrayResult<any>;
  albums?: TidalArrayResult<any>;
  playlists?: TidalArrayResult<any>;
  tracks?: TidalArrayResult<TidalTrack>;
  videos?: TidalArrayResult<any>;
  topHit: any;
}

export class TidalError extends Error implements ITidalError {
  constructor(err: ITidalError) {
    super("TIDAL's API threw an error: " + err.userMessage + " | Details: " + JSON.stringify(err));
    this.userMessage = err.userMessage;
    this.subStatus = err.subStatus;
    this.status = err.status;
  }

  status: number;
  subStatus: number;
  userMessage: string;
}


export interface ITidalError {
  status: number;
  subStatus: number;
  userMessage: string;
}



export interface SearchParams {
  query?: string;
  filter?: string;
  limit?: number;
  /**
   * Allowed Values: ARTISTS,ALBUMS,TRACKS,VIDEOS,PLAYLISTS
   * Join multiple Values like shown above to search in multiple types
   */
  types?: string;
  offset?: number;
}

export const DefaultSearchParam = {
  limit: 100,
  offset: 0,
  filter: "ALL",
  types: `ARTISTS,ALBUMS,TRACKS,VIDEOS,PLAYLISTS`
} as SearchParams;


export interface TidalStreamInfo {
  url: string
  trackId: string,
  playTimeLeftInMinutes: number,
  soundQuality: string,
  encryptionKey: string,
  codec: string
}