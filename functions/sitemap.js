///sitemap  for using in torrentz2eu open source source php script. onverted from the php version



apiServer = 'https://torrents-api.1111110.xyz/api/torrent-api-v1';

apiServerSiteMap = 'https://torrents-api.1111110.xyz/api/torrent-site-map'; //not implemented yet

let topUsers = ['TvTeam','jajaja','TGxGoodies','.BONE.','GalaxyRG','shmasti','ThumperTM','sotnikam','xxxlavalxxx','Truth4U','GoodFilms','haxnode','dauphong','YIFY','surferbroadband','Cristie65','threesixtyp','spy1984','GalaXXXy','Mesoglea','CenaCme','PornyXXX','roflcopter2110','MrStark','Cybotage','merzedes','tuts756','bluesenlasondas','thethingy','jmanwf','FirstUploads','rjaa','DeGun','SmashAndGrab','DarkAngie','pmnetwork','Drebben','palahubog','Dbaum2','bubanee','oneanight','Horisarte','dauphong','NoMercy','CJDanVamme','HighCode','Yurievij','manam69','thegreenfrog','bestec1234','zakareya','MANTESH','nemesis43','mc3dom','HeroMaster','Beolab1700','baby967','geogaddi000','Iznogoud9','vtwin88cube','kajalsus','jsk123','extremezone','Capajebo','only1joe','PirateBoy','Taker009','blaze69','mercs215','liluser','zingooo','thenoobish','mercs215','Askeen','azaq318','TheRival','eyezin','joew771','orcwar','NewPornUp','Agricola','fstrnu','lowfilms','gnv65','594mgnav','NawalaTPB','kotuwa','Iznogoud9','svdinesh','420weedman','ill88eagle','RobbieDee','AN0NYMOUS142857','zerodayz','cenkota','ulysses56','brodahisou','blackcanary','594mgnav','RubrumPopulus','horrorhound','STFmaryville','neil1966hardy','oracenelson','ParrowJack','VikTSlick','LeonardTSpock','gesserit','shipjolly','thenoobish','cad40','BLACKTROY','FatFreddy347','scene4all','webchella','AncientRome','Sarah116','rcbcsk','Drarbg','ADHDerby','sonilem','Stepherd','dohduhdah','STBGD','RedDr4gon','BOZX','7436746','MeRaDil','Sbyky','Ashja','GRNS3','RobbingHood','Capajebo','oracenelson','2nafish','RosaMannen','FiNEHD','NLUPPER002','zibbik','deepstatus','johnefp','maxrus','analogkid6103','sartre7','MeRaDil','black%20mamba%20TNT','minarcus','pucholoco','hotpena','insinuendo','aoloffline','icecracked','r3dcat','TheExecutive','Daman4Iife','Invader97','neil1966hardy','matreshka4u','cholo24','ThorntonWilde','twentyforty','MP4SUX','dtrbot','sailo','haloReD','sotis','POtHS11','Bullrout','Dattebayo03','crwildman','FatFuckFrank','tzuhalem','rpessoa','yfjfrj','CuriousGeorge','mfccorrea','tzuhalem','zacrenec','lkobescak','thelad53','brutalmaster','Ali-TPB'];

/*
//this require for cloudflare worker
addEventListener('fetch', event => {
  
  event.passThroughOnException();
  event.respondWith(handleRequest(event.request));  
})
//*/

//this require for cloudflare pages functions
//*
export async function onRequest( context ) {
  // Contents of context object
  /*
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  */
  
  return await handleRequest( context.request ); //request is a part of context object in pages functions.
}
//*/

async function handleRequest( request ) {
//async function handleRequest(request) { //for worker
	var url = request.url;
	var dt = new Date(Date.now());
    dateToday = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
	
	
	const { searchParams } = new URL(url);
	       
	
    let recent = searchParams.get('recent');
	if(recent==null){ recent = 'No-recent-found.'; }
    let page = searchParams.get('page');
	if(page==null){ page = 'No-page-found.'; }
    let userpage = searchParams.get('userpage');
	if(userpage==null){ userpage = 'No-userpage-found.'; }
    let user = searchParams.get('user');
	if(user==null){ user = 'No-user-found.'; }
    let users = searchParams.get('users');
	if(users==null){ users = 'No-users-found.'; }
    let start = searchParams.get('start');
	if(start==null){ start = 'No-start-found.'; }
    let count = searchParams.get('count');
	if(count==null){ count = 'No-count-found.'; }
    let sort = searchParams.get('sort');
	if(sort==null){ sort = 'No-sort-found.'; }
	
	//if(tid==null){ tid = 'No-tid-found.'; }
	let request_url = url.toString();
	
	site_link =  request_url.split('?');
    site_link = site_link[0];
    site_link =  site_link.split('sitemap');
    site_link = site_link[0];
	
	siteMapBody = '';
	
	
	//sitemap urlset
	//recent with pages (recent pagination)
	if( recent != 'No-recent-found.' && page != 'No-page-found.' ){
		pageNumber = page;
		apiUrl = apiServer + '?pid=data_top100_recent_' + (pageNumber - 1) + '.json';
		if(pageNumber == 1){ apiUrl = apiServer + '?pid=data_top100_recent.json'; }
		
		
		json_data = await fetch(apiUrl);
		results = await json_data.json();
		
		
		siteMapBody = json_to_sitemap(results, site_link);
		siteMap = sendXmlSiteMapUrlset(siteMapBody);
		
	}
	//sitemap urlset
	else if(user != 'No-user-found.' && userpage != 'No-userpage-found.'){
		userName = user;
		
		apiUrl = apiServer + `?q=user%3A${userName}%3A${userpage}`;
		if(userpage == 1){ apiUrl = apiServer + `?q=user%3A${userName}`; }
		
		json_data = await fetch(apiUrl);
		results = await json_data.json();
		
		siteMapBody = json_to_sitemap(results, site_link);
		siteMap = sendXmlSiteMapUrlset(siteMapBody);
	}
	//user
	//sitemap index
	else if(user != 'No-user-found.'){
		userName = user;
		
		apiUrl = apiServer + '?q=pcnt%3A' + userName;
		
		json_data = await fetch(apiUrl);
		results = await json_data.text();
		
		pages_count =  results.replace(/\D/g,''); //replace all no numbers
		pages_count = parseInt(pages_count);
		
		for(let i=1; i<=pages_count; i++){
			siteMapIndex =  site_link  + `sitemap?user=${userName}&amp;userpage=${i}`;
			siteMapBody = siteMapBody + `<sitemap><loc>${siteMapIndex}</loc><lastmod>${dateToday}</lastmod></sitemap>\n`;		
		}
		
		siteMap = sendXmlSiteMapIndex(siteMapBody);
	}
	//sitemap index
	else if(users != 'No-users-found.'){
		for(let i=0; i<topUsers.length; i++){		
			user = topUsers[i];
			if(user!=''){
				siteMapIndex =  site_link  + `sitemap?user=${user}`;
				siteMapBody = siteMapBody + `<sitemap><loc>${siteMapIndex}</loc><lastmod>${dateToday}</lastmod></sitemap>\n`;
			}			
		}
		
		siteMap = sendXmlSiteMapIndex(siteMapBody);
	}
	else if(recent != 'No-recent-found.' ){
	
		for(let i=1; i<=159; i++){		
			siteMapIndex = site_link  + `sitemap?recent=true&amp;page=${i}`;
			siteMapBody = siteMapBody + `<sitemap><loc>${siteMapIndex}</loc><lastmod>${dateToday}</lastmod></sitemap>\n`;       	
		}
		
		siteMap = sendXmlSiteMapIndex(siteMapBody);	
	}
	//for temporary, it is same as recent 
	else{
		for(let i=1; i<=159; i++){		
			siteMapIndex = site_link  + `sitemap?recent=true&amp;page=${i}`;
			siteMapBody = siteMapBody + `<sitemap><loc>${siteMapIndex}</loc><lastmod>${dateToday}</lastmod></sitemap>\n`;       	
		}
		
		siteMap = sendXmlSiteMapIndex(siteMapBody);	
	}
	//sitemap urlset
	//not implemented yet
	/*
	else if( start != 'No-start-found.' && count != 'No-count-found.' && sort != 'No-sort-found.' ){		
			
		apiUrl = apiServerSiteMap + `?start=${start}&count=${count}&sort=${sort}`;

		json_data = await fetch(apiUrl);
		results = await json_data.json();		
		
		results = results[1]['results'];
		
		siteMapBody = json_to_sitemap(results,site_link);
		siteMap = sendXmlSiteMapUrlset(siteMapBody);
		
	}
	*/	
	
	return new Response(siteMap, {
		headers: {
		  'content-type': 'text/xml;charset=UTF-8',
		},
	  });
}





function json_to_sitemap(results, site_link){
	siteMapBody = '';
	for ( var i = 0; i < results.length; i++){
			res = results[i];
			id = res['id'];
			id =  id.replace(/\D/g,''); //replace all no numbers
		    id = parseInt(id);
			ids = id.toString(36);
			title = res['name'];
			sluz = slugify(title);
			siteMapUrl =  site_link + `T${ids}/` + rawurlencode(sluz);
			siteMapBody = siteMapBody +  `<url><loc>${siteMapUrl}</loc><lastmod>${dateToday}</lastmod></url>\n`;
		}
	return siteMapBody;
}

function sendXmlSiteMapUrlset($body){
	//header('Content-type: text/xml; charset=UTF-8');
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	${$body}
	</urlset>`;
}

function sendXmlSiteMapIndex($body){
	//header('Content-type: text/xml; charset=UTF-8');
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
	<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">
	${$body}
	</sitemapindex>`;
}


function slugify (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -\.]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes 
        .replace(/^-+/g, '') // Trim - from start of text
		.replace(/-+$/g, ''); // Trim - from end of text
    return str;
}

function rawurlencode (str) {
  //       discuss at: https://locutus.io/php/rawurlencode/
  
  str = (str + '')
  // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
  // but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
}
