'use server';

import { Song } from "@/types/song";

type getReleaseReturn = {
    release?: Song
    error?: string
}

export async function getRelease(): Promise<getReleaseReturn> {

    console.log("Running: ", new Date().toLocaleString());
    try {

        const release: Song = await getSearchRelease();
        // console.log(release);
        return {release};

    } catch (error) {
        console.log(`[getRelease] Error fetching record from discogs. Error: `, error);
        return {error: String(error)};
    }
}

export async function getSearchRelease() {
    
    const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN
    const DISCOGS_USER_AGENT = process.env.DISCOGS_USER_AGENT;

    if (!DISCOGS_TOKEN || !DISCOGS_USER_AGENT) {
        console.error("Discogs API token not detected. Add DISCOGS_TOKEN and DISCOGS_USER_AGENT to your .env file and try again.")
        return
    }

    console.log("Running: ", new Date().toLocaleString());
    const url = new URL("https://api.discogs.com/database/search");
    url.searchParams.append("type", "release");
    url.searchParams.append("genre", "pop");
    url.searchParams.append("token", DISCOGS_TOKEN)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": DISCOGS_USER_AGENT,
            },
        });


        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
        }

        const data = await response.json();
        const release = await getReleaseById(data.results[Math.floor(Math.random() * data.results.length)].id);
        console.log(data.results.length);

        return release;

    } catch (error) {
        console.log(`Error fetching record from discogs. Error: `, error);
        return ({success: false, error: error});
    }
}

export async function getReleaseById(id: number) {

    const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN
    const DISCOGS_USER_AGENT = process.env.DISCOGS_USER_AGENT;

    if (!DISCOGS_TOKEN || !DISCOGS_USER_AGENT) {
        console.error("Discogs API token not detected. Add DISCOGS_TOKEN and DISCOGS_USER_AGENT to your .env file and try again.")
        return
    }

    const url = `https://api.discogs.com/releases/${id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": DISCOGS_USER_AGENT,
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}}`)
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.log(`Error fetching record #${id} from discogs. Error: `, error);
        return ({success: false, error: error});
    }
}

const bruh = {
  id: 2290862,
  status: 'Accepted',
  year: 1966,
  resource_url: 'https://api.discogs.com/releases/2290862',
  uri: 'https://www.discogs.com/release/2290862-Al-Martino-Spanish-Eyes',
  artists: [
    {
      name: 'Al Martino',
      anv: '',
      join: '',
      role: '',
      tracks: '',
      id: 266267,
      resource_url: 'https://api.discogs.com/artists/266267',
      thumbnail_url: 'https://i.discogs.com/W-ZVlakdaktR2EDA9LcqrDSs_z2R-Nbf4Sl7P2B3gGQ/rs:fit/g:sm/q:90/h:577/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI2NjI2/Ny0xNjgyNTE0OTAz/LTEwODgucG5n.jpeg'
    }
  ],
  artists_sort: 'Al Martino',
  labels: [
    {
      name: 'Capitol Records',
      catno: 'ST 2435',
      entity_type: '1',
      entity_type_name: 'Label',
      id: 654,
      resource_url: 'https://api.discogs.com/labels/654',
      thumbnail_url: 'https://i.discogs.com/jOm50Ncnop3VOhKg0rYbdvq7epxn5mnXdOWfVQNjOBg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9MLTY1NC0x/NzgxODU0Mzk3LTU2/MzcuanBlZw.jpeg'
    }
  ],
  series: [],
  companies: [
    {
      name: 'Electric & Musical Industries Ltd.',
      catno: '',
      entity_type: '16',
      entity_type_name: 'Made By',
      id: 293204,
      resource_url: 'https://api.discogs.com/labels/293204',
      thumbnail_url: 'https://i.discogs.com/8kdpbIYHc0oI0b28Y7sggUeSnXn8fl9k7hUX-6jcSME/rs:fit/g:sm/q:90/h:185/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9MLTI5MzIw/NC0xNTI4NTUyNDkx/LTI5NjYuanBlZw.jpeg'
    }
  ],
  formats: [ { name: 'Vinyl', qty: '1', descriptions: [Array] } ],
  data_quality: 'Needs Vote',
  community: {
    have: 190,
    want: 10,
    rating: { count: 9, average: 3.22 },
    submitter: {
      username: 'rolltunes',
      resource_url: 'https://api.discogs.com/users/rolltunes'
    },
    contributors: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    data_quality: 'Needs Vote',
    status: 'Accepted'
  },
  format_quantity: 1,
  date_added: '2010-05-25T07:08:18-07:00',
  date_changed: '2021-07-04T08:13:00-07:00',
  num_for_sale: 55,
  lowest_price: 0.2,
  master_id: 155399,
  master_url: 'https://api.discogs.com/masters/155399',
  title: 'Spanish Eyes',
  country: 'UK',
  released: '1966',
  released_formatted: '1966',
  identifiers: [
    {
      type: 'Matrix / Runout',
      value: 'ST1 2435-B4  0 1',
      description: 'Runout A, stamped'
    },
    {
      type: 'Matrix / Runout',
      value: 'ST 2 2435-A3  G 1',
      description: 'Runout B, stamped'
    }
  ],
  videos: [
    {
      uri: 'https://www.youtube.com/watch?v=TrQAg5KZAcE',
      title: 'Spanish Eyes ~ Al Martino (1967)',
      description: 'Title: Spanish Eyes \n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #BertKaempfert, #EddieSnyder, and #CharlesSingleton\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the origin',
      duration: 164,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=6rtbGov4E6A',
      title: 'My Foolish Heart ~ Al Martino (1967)',
      description: 'Title: My Foolish Heart\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #VictorYoung and #NedWashington\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Plea',
      duration: 153,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=qxe_QssXMQo',
      title: 'By the River of the Roses ~ Al Martino (1967)',
      description: 'Title: By the River of the Roses\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #JoeBurke and #MartySynes\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'P',
      duration: 156,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=4MxF6oubeww',
      title: 'Make the World Go Away ~ Al Martino (1967)',
      description: 'Title: Make the World Go Away\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #HankCochran\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Please consider s',
      duration: 143,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=QnLU-AnIVAM',
      title: 'Hello, Memory ~ Al Martino (1967)',
      description: 'Title: Hello, Memory \n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #RussFaith\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Please consider supporting ',
      duration: 148,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=1bFxw9iXUUY',
      title: 'Till Then, My Love ~ Al Martino (1967)',
      description: 'Title: Till Then, My Love\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #JackCanning and #JesseHodges\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Plea',
      duration: 147,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=83ICmXVmeLs',
      title: 'The White Rose of Athens ~ Al Martino (1967)',
      description: 'Title: The White Rose of #Athens\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #ManosHadjidakis, #Norman Newell, and #ArchieBleyer\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored fro',
      duration: 174,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=p8fhErf4h8M',
      title: 'Forgive Me ~ Al Martino (1967)',
      description: 'Title: Forgive Me\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #MiltonAger and #JackYellen\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Please conside',
      duration: 153,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=FusKSFTuMiY',
      title: 'The End of the World ~ Al Martino (1967)',
      description: 'Title: The End of the World\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #SylivaDee and #ArthurKent\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #LPAlbum \n' +
        'Pleas',
      duration: 187,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=68s5NZ0nilQ',
      title: 'One Has My Name...The Other Has My Heart ~ Al Martino (1967)',
      description: 'Title: One Has My Name...The Other Has My Heart\n' +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #EddieDean, #DearestDean, and #HalBlair\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored ',
      duration: 142,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=_-8QHhkIAps',
      title: "I'll Hold You in My Heart (Till I Can Hold You in My Arms) ~ Al Martino (1967)",
      description: "Title: I'll Hold You in My Heart (Till I Can Hold You in My Arms)\n" +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #EddyArnold, #VaughnHorton, and #ThomasDilbeck\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening ',
      duration: 173,
      embed: true
    },
    {
      uri: 'https://www.youtube.com/watch?v=SWC3piv5ZOc',
      title: "Think I'll Go Somewhere and Cry Myself to Sleep ~ Al Martino (1967) (Bill Anderson cover)",
      description: "Title: Think I'll Go Somewhere and Cry Myself to Sleep\n" +
        'Artist: #AlMartino\n' +
        'Label: #CapitolRecords ST 2435 \n' +
        'Album: Spanish Eyes\n' +
        'Composer(s): #BillAnderson\n' +
        'Year: #1967\n' +
        'Genre: #1960s #60sMusic #Vocal #EasyListening #Pop\n' +
        '\n' +
        'Digitally restored from the original #',
      duration: 164,
      embed: true
    }
  ],
  genres: [ 'Pop' ],
  styles: [ 'Vocal' ],
  tracklist: [
    {
      position: 'A1',
      type_: 'track',
      title: 'Spanish Eyes',
      duration: ''
    },
    {
      position: 'A2',
      type_: 'track',
      title: 'My Foolish Heart',
      duration: ''
    },
    {
      position: 'A3',
      type_: 'track',
      title: 'By The River Of The Roses',
      duration: ''
    },
    {
      position: 'A4',
      type_: 'track',
      title: 'Make The World Go Away',
      duration: ''
    },
    {
      position: 'A5',
      type_: 'track',
      title: 'Hello Memory',
      duration: ''
    },
    {
      position: 'A6',
      type_: 'track',
      title: 'Till Then, My Love',
      duration: ''
    },
    {
      position: 'B1',
      type_: 'track',
      title: 'The White Rose Of Athens',
      duration: ''
    },
    {
      position: 'B2',
      type_: 'track',
      title: 'Forgive Me',
      duration: ''
    },
    {
      position: 'B3',
      type_: 'track',
      title: 'The End Of The World',
      duration: ''
    },
    {
      position: 'B4',
      type_: 'track',
      title: 'One Has My Name...The Other Has My Heart',
      duration: ''
    },
    {
      position: 'B5',
      type_: 'track',
      title: "I'll Hold You In My Heart (Till I Can Hold You In My Arms)",
      duration: ''
    },
    {
      position: 'B6',
      type_: 'track',
      title: "Think I'll Go Somewhere And Cry Myself To Sleep",
      duration: ''
    }
  ],
  extraartists: [
    {
      name: 'Peter De Angelis',
      anv: 'Pete De Angelis',
      join: '',
      role: 'Arranged By, Conductor',
      tracks: '',
      id: 397221,
      resource_url: 'https://api.discogs.com/artists/397221'
    },
    {
      name: 'Ken Veeder',
      anv: '',
      join: '',
      role: 'Photography By [Cover]',
      tracks: '',
      id: 2235486,
      resource_url: 'https://api.discogs.com/artists/2235486'
    },
    {
      name: 'Tom Morgan',
      anv: '',
      join: '',
      role: 'Producer',
      tracks: '',
      id: 253416,
      resource_url: 'https://api.discogs.com/artists/253416'
    }
  ],
  images: [
    {
      type: 'primary',
      uri: 'https://i.discogs.com/kyQSBSQKZDJY-7wGVBLMNKrRLs8OOYpVJY32UpRayYU/rs:fit/g:sm/q:90/h:281/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTM2MTMwMjky/Mi0xNTQ5LmpwZWc.jpeg',
      resource_url: 'https://i.discogs.com/kyQSBSQKZDJY-7wGVBLMNKrRLs8OOYpVJY32UpRayYU/rs:fit/g:sm/q:90/h:281/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTM2MTMwMjky/Mi0xNTQ5LmpwZWc.jpeg',
      uri150: 'https://i.discogs.com/PLbD8ER46hNXSv1EeKwJZNve7K3sspmnUd_yQ95pyPw/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTM2MTMwMjky/Mi0xNTQ5LmpwZWc.jpeg',
      width: 300,
      height: 281
    },
    {
      type: 'secondary',
      uri: 'https://i.discogs.com/-CXhQ3JFzn-8xYjFlJk7RBDhDhaYA6G94S4BR3FvOso/rs:fit/g:sm/q:90/h:567/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTQw/MC03ODcwLmpwZWc.jpeg',
      resource_url: 'https://i.discogs.com/-CXhQ3JFzn-8xYjFlJk7RBDhDhaYA6G94S4BR3FvOso/rs:fit/g:sm/q:90/h:567/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTQw/MC03ODcwLmpwZWc.jpeg',
      uri150: 'https://i.discogs.com/kZOqQQbh3m_v6Ua_T6pp81fZDkAQlG8Zj5wDNaWw554/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTQw/MC03ODcwLmpwZWc.jpeg',
      width: 600,
      height: 567
    },
    {
      type: 'secondary',
      uri: 'https://i.discogs.com/Aa3t9PQLnuWF3wlYpEOdfx1UrsmzDtFO2TW62YjpM1o/rs:fit/g:sm/q:90/h:600/w:573/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zODI0LmpwZWc.jpeg',
      resource_url: 'https://i.discogs.com/Aa3t9PQLnuWF3wlYpEOdfx1UrsmzDtFO2TW62YjpM1o/rs:fit/g:sm/q:90/h:600/w:573/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zODI0LmpwZWc.jpeg',
      uri150: 'https://i.discogs.com/dCprXzo0wfQFAY8H8_Z7pjcz2XDCtPZ5wn34yCRXWBo/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zODI0LmpwZWc.jpeg',
      width: 573,
      height: 600
    },
    {
      type: 'secondary',
      uri: 'https://i.discogs.com/1FG4pdhn5M_kPAx3h6Y0-A5AMcxCKH4fft9AjJgSCjA/rs:fit/g:sm/q:90/h:600/w:587/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zOTU5LmpwZWc.jpeg',
      resource_url: 'https://i.discogs.com/1FG4pdhn5M_kPAx3h6Y0-A5AMcxCKH4fft9AjJgSCjA/rs:fit/g:sm/q:90/h:600/w:587/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zOTU5LmpwZWc.jpeg',
      uri150: 'https://i.discogs.com/qDlpJeMSccCkRVMbv7GS1zxVt1AdabmMa0l0Omsavag/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTU3MDI2MTM5/OC0zOTU5LmpwZWc.jpeg',
      width: 587,
      height: 600
    }
  ],
  thumb: 'https://i.discogs.com/PLbD8ER46hNXSv1EeKwJZNve7K3sspmnUd_yQ95pyPw/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTA4/NjItMTM2MTMwMjky/Mi0xNTQ5LmpwZWc.jpeg',
  estimated_weight: 230,
  blocked_from_sale: false,
  is_offensive: false
}