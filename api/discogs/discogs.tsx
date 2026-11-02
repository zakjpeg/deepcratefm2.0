'use server';

import { Song } from "@/types/song";
import logToFile from "@/util/log/logToFile";
import fs from 'fs';

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
    // ZAK TODO: Refine the search queries
    url.searchParams.append("type", "release");
    url.searchParams.append("country", "us");
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
        // Log data in file
        // fs.appendFile(JSON.stringify(data), (err) => {
        //     if (err) console.error('Failed to write log:', err);
        // });
        
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

type getTrendingReleasesType = {
    releases?: Song[],
    error?: string,
}
export async function getTrendingReleases(): Promise<getTrendingReleasesType> {
    
    const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN
    const DISCOGS_USER_AGENT = process.env.DISCOGS_USER_AGENT;
    

    if (!DISCOGS_TOKEN || !DISCOGS_USER_AGENT) {
        console.error("Discogs API token not detected. Add DISCOGS_TOKEN and DISCOGS_USER_AGENT to your .env file and try again.")
        return {error: "Couldn't get trending releases"};
    }

    // Log data in file
    // logToFile('getTrendingReleases running...');

    const url = new URL("https://api.discogs.com/database/search");

    // Get trending releases
    url.searchParams.append("type", "release");
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

        const releases = data.results;

        return {releases};

    } catch (error) {
        console.log(`Error fetching record from discogs. Error: `, error);
        return ({error: String(error)});
    }
}