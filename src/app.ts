import instagram from "./insta/insta";
import instagramUrl from './insta/instaUrl';
import puppeteer from 'puppeteer';
import instaCheerio from './insta/instaCheerio';
import fs from 'fs';
import rp from 'request-promise';
import request from 'request';
import cheerio from 'cheerio';
import * as UrlData from './insta/results/narutoUrl.json';
import * as UrlHinataData from './insta/results/hinataUrl.json';
import { resolve, reject } from "bluebird";


//최대 url 개수는 2378개

const crawlingCheerioAllPage = (urlArr : string[]) => {
    Promise.all(urlArr.map((url)=> instaCheerio(url))).then((result)=>{
        console.log(result);
    }).catch((err) => console.log(err));
}

const launch = async() =>{
    const programStartTime : number = await new Date().getTime();
    instagramUrl("izone", 300)
    .then((urlArr)=> crawlingCheerioAllPage(urlArr))
    .then(()=>{
        const programEndTime : number = new Date().getTime();
        console.log((programEndTime-programStartTime)-1000);
    })
}

launch();