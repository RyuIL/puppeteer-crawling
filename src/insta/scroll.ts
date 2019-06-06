function extractItems() {
  // const extractedElements : any = document.querySelectorAll('#boxes > div.box');
  const extractedElements : any = document.querySelectorAll('div.KL4Bh > img');
  const items : Array<String> = [];

  for (let element of extractedElements) {
    let temp : Array<String> = element.srcset.split(",");
    let inputImgSrc = temp[temp.length-1].split(" ");
    items.push(inputImgSrc[0]);
  }

  return items;
}


// #react-root > section > main > article > div:nth-child(3) > div > div:nth-child(13) > div:nth-child(3) > a > div.eLAPa > div.KL4Bh > img

// #react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div.KL4Bh > img

// #react-root > section > main > article > div:nth-child(3) > div > div:nth-child(12) > div:nth-child(3) > a > div > div.KL4Bh > img


/**
 * Scrolls and extracts content from a page.
 * @param {object} page - A loaded Puppeteer Page instance.
 * @param {function} extractItems - Item extraction function that is injected into the page.
 * @param {number} itemTargetConut - The target number of items to extract before stopping.
 * @param {number} scrollDelay - The time (in milliseconds) to wait between scrolls.
 */
async function scrapeInfiniteScrollItems(page : any, extractItems : any, itemTargetCount : any, scrollDelay : number = 1000) {
  let items : Array<String> = [];
  let totalItems : Array<String> = [];
  try {
    let previousHeight;
    while (totalItems.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      appendArray(items, totalItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch(e) { }
  return totalItems;
}

async function appendArray(items : Array<String>, totalItems : Array<String>) {
  if(items.length < 54){
    totalItems = items;
  }else {
    for(let i of items){
      let isInItem : boolean = false;
      for(let j of totalItems){
        if(i===j){
          isInItem = true;
          break;
        }
      }
      if(!isInItem){
        totalItems.push(i);
      }
    }
  }
  console.log(totalItems.length);
}

export {extractItems, scrapeInfiniteScrollItems};