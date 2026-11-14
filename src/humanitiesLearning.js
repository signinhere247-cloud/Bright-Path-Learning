/**
 * BrightPath History & Geography — Stage 2 Step 8.
 * England-oriented draft pathways and original explained starter questions.
 * EYFS entries are exploratory Understanding the World activities, not
 * separately mandated History/Geography subjects. KS4 is optional enrichment,
 * not a GCSE exam-board specification. No existing saves or lessons are changed.
 */
const historyYears={
 nursery:['past-present','family-stories'],
 reception:['past-present','family-stories','local-history'],
 'year-1':['past-present','chronology','local-history','historical-sources'],
 'year-2':['chronology','local-history','significant-people','historical-sources'],
 'year-3':['chronology','stone-age','ancient-egypt','historical-sources'],
 'year-4':['chronology','roman-britain','anglo-saxons','historical-sources'],
 'year-5':['chronology','vikings','ancient-greece','historical-sources'],
 'year-6':['chronology','british-history','world-civilisations','historical-sources'],
 'year-7':['chronology','medieval-britain','normans','historical-enquiry','historical-sources'],
 'year-8':['tudors','stuarts','industrial-revolution','empire-slavery','historical-enquiry'],
 'year-9':['world-war-one','world-war-two','holocaust','civil-rights','historical-enquiry'],
 'year-10':['thematic-history','british-history','world-history','historical-enquiry','interpretations'],
 'year-11':['thematic-history','british-history','world-history','historical-enquiry','interpretations']
};
const geographyYears={
 nursery:['local-places','weather','nature'],
 reception:['local-places','weather','nature','simple-maps'],
 'year-1':['local-places','simple-maps','continents','weather','physical-features'],
 'year-2':['simple-maps','continents','oceans','countries-uk','human-features','weather'],
 'year-3':['map-skills','countries-uk','rivers','mountains','climate','fieldwork'],
 'year-4':['map-skills','europe','settlements','water-cycle','climate','fieldwork'],
 'year-5':['map-skills','north-south-america','biomes','rivers','trade','fieldwork'],
 'year-6':['map-skills','latitude-longitude','time-zones','earthquakes','volcanoes','sustainability'],
 'year-7':['map-skills','tectonics','weather-climate','population','ecosystems','fieldwork'],
 'year-8':['development','urbanisation','resources','coasts','rivers','fieldwork'],
 'year-9':['climate-change','globalisation','migration','hazards','sustainability','fieldwork'],
 'year-10':['physical-landscapes','weather-climate','ecosystems','urbanisation','development','fieldwork'],
 'year-11':['hazards','resources','climate-change','globalisation','sustainability','fieldwork']
};
export const humanitiesTopicNames=Object.freeze({
 'past-present':'Past and present','family-stories':'Family and community stories',
 'local-history':'Local history',chronology:'Chronology','historical-sources':'Historical sources',
 'significant-people':'Significant people','stone-age':'Stone Age to Iron Age',
 'ancient-egypt':'Ancient Egypt','roman-britain':'Roman Britain','anglo-saxons':'Anglo-Saxon Britain',
 vikings:'Vikings','ancient-greece':'Ancient Greece','british-history':'British history',
 'world-civilisations':'World civilisations','medieval-britain':'Medieval Britain',
 normans:'Norman Conquest','historical-enquiry':'Historical enquiry',tudors:'Tudors',
 stuarts:'Stuarts','industrial-revolution':'Industrial Revolution',
 'empire-slavery':'Empire, enslavement and abolition','world-war-one':'First World War',
 'world-war-two':'Second World War',holocaust:'The Holocaust','civil-rights':'Civil rights',
 'thematic-history':'Thematic history','world-history':'World history',
 interpretations:'Historical interpretations',
 'local-places':'Places around us',weather:'Weather',nature:'Natural surroundings',
 'simple-maps':'Simple maps',continents:'Continents','physical-features':'Physical features',
 oceans:'Oceans','countries-uk':'Countries of the UK','human-features':'Human features',
 'map-skills':'Maps and geographical skills',rivers:'Rivers',mountains:'Mountains',
 climate:'Climate',fieldwork:'Fieldwork',europe:'Europe',settlements:'Settlements',
 'water-cycle':'Water cycle','north-south-america':'North and South America',
 biomes:'Biomes',trade:'Trade','latitude-longitude':'Latitude and longitude',
 'time-zones':'Time zones',earthquakes:'Earthquakes',volcanoes:'Volcanoes',
 sustainability:'Sustainability',tectonics:'Plate tectonics',
 'weather-climate':'Weather and climate',population:'Population',ecosystems:'Ecosystems',
 development:'Development',urbanisation:'Urbanisation',resources:'Natural resources',
 coasts:'Coasts','climate-change':'Climate change',globalisation:'Globalisation',
 migration:'Migration',hazards:'Natural hazards','physical-landscapes':'Physical landscapes'
});
export const historyYearTopicMap=Object.freeze(Object.fromEntries(Object.entries(historyYears).map(([y,t])=>[y,Object.freeze([...t])])));
export const geographyYearTopicMap=Object.freeze(Object.fromEntries(Object.entries(geographyYears).map(([y,t])=>[y,Object.freeze([...t])])));
function mappedTopics(map,yearId,label){
 if(!Object.hasOwn(map,yearId))throw Error('Unknown '+label+' school year.');
 return map[yearId].map(id=>({id,title:humanitiesTopicNames[id],yearId}));
}
export function historyTopicsForYear(yearId){return mappedTopics(historyYearTopicMap,yearId,'History');}
export function geographyTopicsForYear(yearId){return mappedTopics(geographyYearTopicMap,yearId,'Geography');}
// Each record: prompt, correct answer, two plausible alternatives, explanation.
// Questions are starter examples, not a claim of exhaustive coverage.
const historyBank={
 'past-present':['Which happened in the past?','Yesterday','Tomorrow','Next week','Yesterday has already happened.'],
 'family-stories':['What can a family photograph help us learn about?','Life at the time it was taken','Tomorrow’s weather','A guaranteed complete history','A photograph can provide clues about people and places at a particular time.'],
 'local-history':['Which source might show how your town changed?','An old local map','A weather forecast for next week','A fictional map of another planet','Comparing maps from different dates can show local changes.'],
 chronology:['Which order runs from earliest to latest?','Roman Britain, Victorian Britain, present day','Present day, Roman Britain, Victorian Britain','Victorian Britain, present day, Roman Britain','Roman Britain came before the Victorian era, which came before today.'],
 'historical-sources':['What is a primary source?','Evidence created during the period studied','Any modern textbook','A guess without evidence','Primary sources originate from the period or events being investigated.'],
 'significant-people':['Why do historians study significant people?','To understand their influence and historical context','Because everyone agrees about their impact','To avoid studying ordinary people','Significance depends on evidence, impact and historical context.'],
 'stone-age':['Which material gave the Stone Age its name?','Stone','Plastic','Steel','Stone tools were widely used in the Stone Age.'],
 'ancient-egypt':['What was the Nile important for in ancient Egypt?','Water and fertile farmland','Making the desert disappear','Providing electricity','The Nile supported agriculture and transport.'],
 'roman-britain':['What was a Roman road useful for?','Moving people, goods and soldiers','Flying aircraft','Transporting trains','Roads helped travel, trade and military movement.'],
 'anglo-saxons':['Which groups settled in parts of Britain after Roman rule?','Angles and Saxons','Aztecs and Incas','Ancient Egyptians','Angles, Saxons and other groups migrated to and settled in Britain.'],
 vikings:['Where did Viking raiders and settlers mainly originate?','Scandinavia','South America','Australia','Viking groups came largely from areas now called Denmark, Norway and Sweden.'],
 'ancient-greece':['Which city-state is associated with an early form of democracy?','Athens','Rome','Babylon','Classical Athens developed a form of direct democracy, although many residents were excluded.'],
 'british-history':['Why might two accounts of the same event differ?','Authors have different perspectives and evidence','The past changes each day','Every source is equally accurate','Sources reflect their creators’ perspectives, purposes and access to evidence.'],
 'world-civilisations':['What can archaeology reveal about past societies?','Material evidence of everyday life','Exact thoughts of every person','Certain predictions of the future','Objects and remains help reconstruct aspects of past societies.'],
 'medieval-britain':['What was a medieval manor?','An estate with land and a community','A modern airport','A steam-powered factory','A manor was an estate that could organise landholding and work.'],
 normans:['In which year did the Battle of Hastings take place?','1066','1215','1666','The Battle of Hastings took place in 1066.'],
 'historical-enquiry':['What strengthens a historical explanation?','Relevant evidence and reasoned interpretation','Only one unsupported opinion','Ignoring conflicting sources','Historical arguments should be supported and evaluated using evidence.'],
 tudors:['Which monarch was the first Tudor king of England?','Henry VII','Henry VIII','Elizabeth I','Henry VII became king after the Battle of Bosworth in 1485.'],
 stuarts:['Which event began in England in 1642?','The English Civil War','The Norman Conquest','The Industrial Revolution','Fighting between royalist and parliamentary forces began in 1642.'],
 'industrial-revolution':['Which change was associated with the Industrial Revolution?','Increased factory production','The invention of farming','The end of all trade','Mechanisation and factories transformed many industries.'],
 'empire-slavery':['Why is it important to use multiple sources when studying enslavement?','To include different experiences and perspectives','To erase the experiences of enslaved people','To assume every account is identical','Different sources help investigate systems of exploitation and the lives and resistance of affected people.'],
 'world-war-one':['In which year did the First World War begin?','1914','1939','1815','The First World War began in 1914.'],
 'world-war-two':['In which year did the Second World War begin in Europe?','1939','1914','1965','Germany invaded Poland in 1939, followed by declarations of war by Britain and France.'],
 holocaust:['What does the Holocaust refer to?','The Nazi genocide of six million Jewish people','A single battle in 1914','The building of the Berlin Wall','Nazi Germany and its collaborators systematically murdered six million Jews; other groups were also persecuted and murdered.'],
 'civil-rights':['What is a civil rights movement?','Organised efforts to secure equal legal and social rights','A campaign to abolish all laws','A type of industrial machine','Civil rights movements challenge discrimination and seek equal rights.'],
 'thematic-history':['What does a thematic study investigate?','Change and continuity in a theme over time','Only one isolated date','Only the lives of monarchs','Thematic history follows a subject across periods.'],
 'world-history':['Why compare societies from different regions?','To examine similarities, differences and connections','To rank all cultures as better or worse','To avoid context','Comparison helps identify distinct experiences and shared developments.'],
 interpretations:['What is a historical interpretation?','An explanation of the past based on selected evidence','A guaranteed eyewitness recording','A forecast of future events','Interpretations are constructed explanations that can be assessed against evidence.']
};
const geographyBank={
 'local-places':['Which place is part of your local area?','A nearby park','The Moon','The Pacific Ocean','A local area includes places close to where you live.'],
 weather:['What does a thermometer measure?','Temperature','Wind direction','Rainfall depth','A thermometer measures temperature.'],
 nature:['Which is a natural feature?','A river','A motorway','A shopping centre','Rivers are natural features; roads and shops are built by people.'],
 'simple-maps':['What does a map key explain?','Map symbols','The weather tomorrow','How old a map reader is','A key explains what symbols and colours on a map represent.'],
 continents:['Which continent contains Kenya?','Africa','Europe','South America','Kenya is in East Africa.'],
 'physical-features':['Which is a physical geographical feature?','Mountain','Railway station','Office building','A mountain is a natural landform.'],
 oceans:['Which ocean lies between Africa and Australia?','Indian Ocean','Arctic Ocean','Atlantic Ocean','The Indian Ocean lies between eastern Africa and western Australia.'],
 'countries-uk':['Which country is part of the United Kingdom?','Wales','France','Ireland','The UK comprises England, Scotland, Wales and Northern Ireland.'],
 'human-features':['Which is a human geographical feature?','A bridge','A waterfall','A mountain','A bridge is constructed by people.'],
 'map-skills':['Which direction is opposite east?','West','North','South','West is opposite east on a compass.'],
 rivers:['What is the mouth of a river?','Where it flows into another body of water','Its highest mountain source','Its deepest underground rock','A river mouth is where a river enters a sea, lake or another river.'],
 mountains:['What is elevation?','Height above a reference level such as sea level','Distance around a lake','The temperature of soil','Elevation describes vertical height relative to a reference level.'],
 climate:['How is climate different from weather?','Climate describes long-term patterns','Climate is only today’s rain','Climate never changes','Climate describes typical conditions and variability over long periods.'],
 fieldwork:['Why might geographers use a tally chart during fieldwork?','To record observations systematically','To guess without observing','To avoid comparing results','Tally charts organise counted observations for analysis.'],
 europe:['Which country is in Europe?','Portugal','Japan','Brazil','Portugal is a European country.'],
 settlements:['What is a settlement?','A place where people live','Only an uninhabited desert','A type of ocean current','Settlements range from hamlets and villages to towns and cities.'],
 'water-cycle':['What is evaporation?','Liquid water changing to water vapour','Water vapour becoming liquid','Rain turning directly into rock','Evaporation transfers liquid water into the atmosphere as vapour.'],
 'north-south-america':['Which continent contains Brazil?','South America','Europe','Africa','Brazil is in South America.'],
 biomes:['What is a biome?','A large ecological region with characteristic climate and life','A single street','A political border','Biomes are broad regions characterised by climate and living communities.'],
 trade:['What is an import?','A good or service brought into a country','A good sent out of a country','A local rainfall measurement','Imports are goods or services purchased from abroad.'],
 'latitude-longitude':['What does latitude measure?','Position north or south of the Equator','Height above sea level','Distance from the coast only','Latitude is angular distance north or south of the Equator.'],
 'time-zones':['Why do places use different local times?','Earth rotates and locations have different longitudes','The Moon always rises at noon','All places see sunrise simultaneously','Earth’s rotation causes differences in solar time; time zones standardise clocks.'],
 earthquakes:['Where do many earthquakes occur?','Near tectonic plate boundaries','Only at the Equator','Only in deserts','Many earthquakes occur where tectonic plates interact.'],
 volcanoes:['What is magma?','Molten rock below Earth’s surface','A type of cloud','Frozen seawater','Molten rock below the surface is magma; at the surface it is called lava.'],
 sustainability:['What does sustainable resource use aim to do?','Meet needs while protecting future availability','Use every resource immediately','Ignore environmental impacts','Sustainability considers present needs and future generations.'],
 tectonics:['What are tectonic plates?','Large moving sections of Earth’s lithosphere','Layers of cloud','Types of compass','Earth’s lithosphere is divided into moving plates.'],
 'weather-climate':['Which describes climate rather than daily weather?','Typical rainfall over 30 years','Today’s temperature at noon','A single afternoon shower','Climate is assessed using long-term weather patterns.'],
 population:['What is population density?','People per unit area','Total area of a country','Average annual rainfall','Population density measures how many people live in a given area.'],
 ecosystems:['What is an ecosystem?','Organisms interacting with each other and their environment','Only one isolated rock','A political boundary','Ecosystems include living organisms and their physical surroundings.'],
 development:['Why is income alone an incomplete measure of development?','It misses health, education and inequality','Income cannot be measured','All countries have identical incomes','Development is multidimensional, including wellbeing and opportunity.'],
 urbanisation:['What is urbanisation?','An increasing share of people living in urban areas','A decrease in every city','The formation of glaciers','Urbanisation describes the growing proportion of a population in towns and cities.'],
 resources:['Which is a renewable energy resource?','Wind','Coal','Crude oil','Wind is replenished naturally on human timescales.'],
 coasts:['What is coastal erosion?','Removal of rock or sediment by coastal processes','The building of a new road','Formation of clouds','Waves and currents can wear away and transport coastal material.'],
 'climate-change':['What is the main cause of recent global warming?','Human greenhouse gas emissions','Changes in Earth’s distance from the Sun each day','The Moon’s phases','Human activities, particularly greenhouse gas emissions, are the dominant cause of recent warming.'],
 globalisation:['What does globalisation describe?','Growing connections between places and economies','Every country becoming identical','The end of international trade','Globalisation involves increasing flows of goods, information, people and capital.'],
 migration:['What is migration?','Movement of people between places to live','The daily rise of tides','The formation of mountains','Migration is movement of people to another place, within or across countries.'],
 hazards:['Which is a natural hazard?','Earthquake','Traffic congestion','A broken keyboard','An earthquake can threaten people and infrastructure.'],
 'physical-landscapes':['What is deposition in a river?','Sediment being dropped when transport capacity decreases','Only the wearing away of rock','Water changing into gas','Deposition occurs when transported material is laid down.']
};
function practice(map,bank,subject,topicId,{yearId,count=6,seed=0}={}){
 const available=mappedTopics(map,yearId,subject);
 if(!available.some(topic=>topic.id===topicId))throw Error('Topic is not mapped to this school year.');
 if(!Number.isInteger(count)||count<1||count>30||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const item=bank[topicId];
 if(!item)throw Error('No starter question for topic.');
 const [prompt,answer,wrongA,wrongB,explanation]=item;
 const choices=[answer,wrongA,wrongB];
 if(new Set(choices).size!==3)throw Error('Duplicate answer options.');
 return Array.from({length:count},(_,i)=>{
  const rotation=(seed+i)%3;
  return {
   questionId:`${subject.toLowerCase()}-${yearId}-${topicId}-${seed}-${i}`,
   subject,yearId,topicId,prompt,answer,
   options:[...choices.slice(rotation),...choices.slice(0,rotation)],
   explanation,sourceStatus:'draft'
  };
 });
}
export function historyPractice(topicId,settings={}){
 return practice(historyYearTopicMap,historyBank,'History',topicId,{yearId:'year-4',...settings});
}
export function geographyPractice(topicId,settings={}){
 return practice(geographyYearTopicMap,geographyBank,'Geography',topicId,{yearId:'year-4',...settings});
}
export function humanitiesContentCoverage(){
 const summarize=(map,bank)=>Object.entries(map).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,uniqueStarterQuestions:topics.filter(id=>Boolean(bank[id])).length
 }));
 return {history:summarize(historyYearTopicMap,historyBank),geography:summarize(geographyYearTopicMap,geographyBank)};
}
