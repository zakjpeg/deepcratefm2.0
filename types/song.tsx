/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Song {
  id: number;
  status: "Accepted" | "Draft" | "Rejected";
  year: number;
  resource_url: string;
  uri: string;
  artists: DiscogsArtistRef[];
  artists_sort: string;
  title: string;
  data_quality: string;
  thumb: string;
  images?: DiscogsImage[];
  community: DiscogsCommunity;
  companies: DiscogsCompany[];
  country: string;
  date_added: string;
  date_changed: string;
  estimated_weight?: number;
  extraartists: DiscogsArtistRef[];
  format_quantity: number;
  formats: DiscogsFormat[];
  genres: string[];
  styles: string[];
  identifiers: DiscogsIdentifier[];
  labels: DiscogsLabelRef[];
  master_id?: number;
  master_url?: string;
  notes?: string;
  num_for_sale?: number;
  lowest_price?: number;
  released?: string;
  released_formatted?: string;
  series: any[]; // Usually follows a schema similar to labels
  tracklist: DiscogsTrack[];
  videos?: DiscogsVideo[];
}

export interface DiscogsArtistRef {
  id: number;
  name: string;
  resource_url: string;
  anv?: string;       // Artist Name Variation
  join?: string;      // Join words like "Feat.", "And", etc.
  role?: string;      // Populated in extraartists
  tracks?: string;
}

export interface DiscogsLabelRef {
  id: number;
  name: string;
  catno: string;      // Catalog Number
  resource_url: string;
  entity_type: string;
}

export interface DiscogsCompany {
  id: number;
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  resource_url: string;
}

export interface DiscogsFormat {
  name: string;
  qty: string;
  text?: string;
  descriptions?: string[]; // e.g., ["LP", "Album", "Stereo"]
}

export interface DiscogsIdentifier {
  type: string;        // e.g., "Barcode", "Matrix Runout"
  value: string;
  description?: string;
}

export interface DiscogsTrack {
  position: string;
  type_: "track" | "heading";
  title: string;
  duration: string;
  artists?: DiscogsArtistRef[];
  extraartists?: DiscogsArtistRef[];
}

export interface DiscogsImage {
  type: "primary" | "secondary";
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export interface DiscogsCommunity {
  have: number;
  want: number;
  rating: {
    count: number;
    average: number;
  };
  submitter: DiscogsUserRef | null;
  contributors: DiscogsUserRef[];
  status: string;
}

export interface DiscogsUserRef {
  username: string;
  resource_url: string;
}

export interface DiscogsVideo {
  uri: string;
  title: string;
  description?: string;
  duration: number;
  embed: boolean;
}
