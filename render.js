const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium').default;
(async () => {
  const path = 'file://' + process.cwd() + '/case-studies/iksir-design-system.html';
  const browser = await puppeteer.launch({
    args: chromium.args, defaultViewport: {width:1440,height:900,deviceScaleFactor:1},
    executablePath: await chromium.executablePath(), headless: true
  });
  const page = await browser.newPage();
  const errors=[];
  page.on('console', m=>{ if(m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e=>errors.push('PAGEERR: '+e.message));
  await page.goto(path, {waitUntil:'networkidle0', timeout:30000}).catch(e=>errors.push('GOTO: '+e.message));
  await new Promise(r=>setTimeout(r,1200));
  await page.screenshot({path:'/tmp/cs_light_top.png', clip:{x:0,y:0,width:1440,height:1600}});
  // dark
  await page.evaluate(()=>{document.documentElement.setAttribute('data-theme','dark');});
  await new Promise(r=>setTimeout(r,400));
  await page.screenshot({path:'/tmp/cs_dark_top.png', clip:{x:0,y:0,width:1440,height:1600}});
  // full page light again
  await page.evaluate(()=>{document.documentElement.setAttribute('data-theme','light');});
  await new Promise(r=>setTimeout(r,300));
  await page.screenshot({path:'/tmp/cs_full.png', fullPage:true});
  const info = await page.evaluate(()=>({
    title:document.title,
    sheets:[...document.styleSheets].map(s=>s.href&&s.href.split('/').pop()).filter(Boolean),
    sections:document.querySelectorAll('.cs-section').length,
    heroFont:getComputedStyle(document.querySelector('.cs-hero-title')).fontFamily,
    scrollW:document.documentElement.scrollWidth, winW:window.innerWidth,
    markLoaded:(()=>{const i=document.querySelector('.cs-hero-mark');return i?i.naturalWidth:-1;})(),
    emptyShots:document.querySelectorAll('.cs-shot.is-empty').length
  }));
  console.log(JSON.stringify(info,null,2));
  console.log('ERRORS:', errors.length?errors.join(' | '):'none');
  await browser.close();
})();
