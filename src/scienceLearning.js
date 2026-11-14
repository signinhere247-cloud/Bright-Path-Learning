/**
 * BrightPath Science — Stage 2 Step 7.
 * England-oriented year pathways and original explained starter questions.
 * Draft content, not a complete or verified statutory/GCSE specification.
 * Does not alter existing lesson IDs, saves, or production.
 */
const yearTopics={
 nursery:['observing','plants','animals','materials','seasons'],
 reception:['observing','plants','animals','materials','seasons','weather'],
 'year-1':['scientific-enquiry','plants','animals','human-body','materials','seasons'],
 'year-2':['scientific-enquiry','plants','habitats','food-chains','materials','human-body'],
 'year-3':['scientific-enquiry','plants','nutrition','rocks','light','forces'],
 'year-4':['scientific-enquiry','living-things','digestion','states-of-matter','sound','electricity'],
 'year-5':['scientific-enquiry','life-cycles','properties','earth-space','forces'],
 'year-6':['scientific-enquiry','classification','evolution','circulation','light','electricity'],
 'year-7':['scientific-enquiry','cells','reproduction','ecosystems','particles','reactions','forces','energy'],
 'year-8':['scientific-enquiry','digestion','respiration','photosynthesis','elements','acids','waves','electricity'],
 'year-9':['scientific-enquiry','genetics','ecosystems','reactions','periodic-table','energy','motion','earth-space'],
 'year-10':['scientific-enquiry','cells','infection','bioenergetics','atomic-structure','bonding','reactions','energy','electricity','particles','forces'],
 'year-11':['scientific-enquiry','homeostasis','inheritance','ecology','rates','organic-chemistry','chemical-analysis','waves','magnetism','radiation','earth-space']
};
export const scienceTopicNames=Object.freeze({
 observing:'Observing and asking questions',plants:'Plants',animals:'Animals',materials:'Everyday materials',
 seasons:'Seasonal changes',weather:'Weather','scientific-enquiry':'Working scientifically',
 'human-body':'Human body',habitats:'Habitats','food-chains':'Food chains',nutrition:'Nutrition',
 rocks:'Rocks and soils',light:'Light',forces:'Forces and motion','living-things':'Living things',
 digestion:'Digestion','states-of-matter':'States of matter',sound:'Sound',electricity:'Electricity',
 'life-cycles':'Life cycles',properties:'Properties and changes of materials','earth-space':'Earth and space',
 classification:'Classification',evolution:'Evolution and adaptation',circulation:'Circulatory system',
 cells:'Cells',reproduction:'Reproduction',ecosystems:'Ecosystems',particles:'Particle model',
 reactions:'Chemical reactions',energy:'Energy',respiration:'Respiration',photosynthesis:'Photosynthesis',
 elements:'Elements and compounds',acids:'Acids and alkalis',waves:'Waves',genetics:'Genetics',
 'periodic-table':'Periodic table',motion:'Motion',infection:'Infection and response',
 bioenergetics:'Bioenergetics','atomic-structure':'Atomic structure',bonding:'Chemical bonding',
 homeostasis:'Homeostasis',inheritance:'Inheritance',ecology:'Ecology',
 rates:'Rates of reaction','organic-chemistry':'Organic chemistry',
 'chemical-analysis':'Chemical analysis',magnetism:'Magnetism',radiation:'Atomic radiation'
});
export const scienceYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(yearTopics).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function scienceTopicsForYear(yearId){
 if(!Object.hasOwn(scienceYearTopicMap,yearId))throw Error('Unknown Science school year.');
 return scienceYearTopicMap[yearId].map(id=>({id,title:scienceTopicNames[id],yearId}));
}
// [prompt, correct answer, two distractors, explanation].
const bank={
 observing:[['Which sense helps us notice a flower’s colour?','Sight','Taste','Hearing','We use our eyes to observe colours.']],
 plants:[['Which plant part usually takes in water from soil?','Roots','Petals','Flowers','Roots absorb water and dissolved minerals.']],
 animals:[['Which animal has feathers?','Robin','Frog','Worm','Robins are birds and have feathers.']],
 materials:[['Which material is usually transparent?','Clear glass','Brick','Wood','Transparent materials allow light to pass through so objects can be seen.']],
 seasons:[['Which season usually has the shortest days in the UK?','Winter','Summer','Spring','Days are generally shortest in winter in the UK.']],
 weather:[['Which instrument measures air temperature?','Thermometer','Ruler','Compass','A thermometer measures temperature.']],
 'scientific-enquiry':[['Why should we change only one variable in a fair test?','To identify its effect','To make the test random','To avoid recording results','Keeping other variables controlled helps isolate the variable being tested.']],
 'human-body':[['Which organ pumps blood around the body?','Heart','Stomach','Lung','The heart contracts to circulate blood.']],
 habitats:[['What is a habitat?','A place where an organism lives','A type of food','A weather instrument','A habitat is the natural place where an organism lives.']],
 'food-chains':[['What do arrows in a food chain usually show?','Direction of energy transfer','Which animal is biggest','The weather','Arrows point from food to consumer, showing energy transfer.']],
 nutrition:[['Which nutrient helps build and repair body tissues?','Protein','Water only','Fibre only','Protein provides amino acids for growth and repair.']],
 rocks:[['Which rock forms when molten rock cools?','Igneous rock','Sedimentary rock','Chalk only','Igneous rock forms when magma or lava solidifies.']],
 light:[['What happens when light hits a mirror?','It reflects','It always disappears','It becomes sound','A mirror reflects much of the light that strikes it.']],
 forces:[['Which force opposes sliding motion between surfaces?','Friction','Gravity only','Magnetism only','Friction acts against relative motion of contacting surfaces.']],
 'living-things':[['What do living organisms need to carry out life processes?','Energy','Plastic','Electric sockets','Living things require energy for their life processes.']],
 digestion:[['Where are most nutrients absorbed into the blood?','Small intestine','Oesophagus','Mouth','The small intestine has a large surface area for absorption.']],
 'states-of-matter':[['What is melting?','Solid changing to liquid','Gas changing to solid','Liquid changing to gas','Melting occurs when a solid changes into a liquid.']],
 sound:[['What causes sound?','Vibrations','Light alone','Stillness','Sound is produced by vibrating objects.']],
 electricity:[['What unit measures electric current?','Ampere','Volt','Ohm','Electric current is measured in amperes (A).']],
 'life-cycles':[['Which stage follows a caterpillar in a butterfly life cycle?','Pupa','Egg','Adult butterfly immediately','A caterpillar becomes a pupa before emerging as an adult butterfly.']],
 properties:[['Which change is usually reversible?','Melting ice','Burning paper','Rusting iron','Melted water can freeze back into ice.']],
 'earth-space':[['What causes day and night on Earth?','Earth rotating','The Moon changing shape','Clouds moving','Earth rotates on its axis roughly once every 24 hours.']],
 classification:[['What is classification in biology?','Grouping organisms by shared features','Counting only their size','Measuring temperature','Biological classification groups organisms according to characteristics and relationships.']],
 evolution:[['What is natural selection?','Better-adapted inherited traits can become more common','Every organism changes because it wants to','All mutations are beneficial','Inherited variation affects survival and reproduction, changing trait frequencies over generations.']],
 circulation:[['Which vessels carry blood away from the heart?','Arteries','Veins','Capillaries only','Arteries carry blood away from the heart.']],
 cells:[['Which structure controls many cell activities and contains most DNA in animal cells?','Nucleus','Cell membrane','Cytoplasm','The nucleus contains most of an animal cell’s genetic material.']],
 reproduction:[['What is fertilisation?','Fusion of gametes','Cell respiration','Food digestion','Fertilisation is the fusion of male and female gametes.']],
 ecosystems:[['What is a producer in an ecosystem?','An organism making organic food from inorganic substances','Only a predator','Only a decomposer','Plants and algae are common producers that photosynthesise.']],
 particles:[['Why can gases be compressed more than liquids?','Particles are much farther apart','Gas particles are bigger','Gas has no particles','Gases contain large spaces between particles.']],
 reactions:[['What is conserved in a chemical reaction in a closed system?','Total mass','Number of molecules of each type','Temperature','Atoms rearrange, so total mass is conserved in a closed system.']],
 energy:[['What is the SI unit of energy?','Joule','Watt','Newton','Energy is measured in joules (J).']],
 respiration:[['What is the main purpose of cellular respiration?','Transfer energy for cell processes','Make all oxygen in air','Destroy all nutrients','Respiration transfers energy from substances such as glucose for cell processes.']],
 photosynthesis:[['Which gas do plants take in during photosynthesis?','Carbon dioxide','Nitrogen only','Hydrogen','Plants use carbon dioxide and water to produce sugars, using light energy.']],
 elements:[['What is an element?','A substance containing one type of atom','A mixture of metals','Any molecule','An element consists of atoms with the same proton number.']],
 acids:[['Which pH is acidic at room temperature?','3','7','11','A pH below 7 is acidic in typical aqueous conditions at room temperature.']],
 waves:[['Which wave can travel through a vacuum?','Light','Sound in air','Water surface waves','Electromagnetic waves such as light do not require a material medium.']],
 genetics:[['What is a gene?','A section of DNA that can affect a characteristic','A whole organism','A cell wall','A gene is a sequence of DNA that can code for a functional product.']],
 'periodic-table':[['How are elements arranged in the modern periodic table?','Increasing atomic number','Alphabetical order','Increasing density only','Elements are ordered by proton number.']],
 motion:[['What is average speed?','Distance divided by time','Time divided by distance','Force multiplied by mass','Average speed = total distance ÷ total time.']],
 infection:[['What is a pathogen?','A disease-causing microorganism or agent','Any vitamin','A healthy red blood cell','Pathogens include disease-causing bacteria, viruses and other agents.']],
 bioenergetics:[['What is the word equation for aerobic respiration?','Glucose + oxygen → carbon dioxide + water','Water + oxygen → glucose','Carbon dioxide → oxygen + nitrogen','Aerobic respiration transfers energy from glucose using oxygen.']],
 'atomic-structure':[['Which particle has a positive electric charge?','Proton','Neutron','Electron','Protons are positively charged, electrons negative, and neutrons neutral.']],
 bonding:[['What happens in ionic bonding?','Electrons are transferred and oppositely charged ions attract','Atoms share only protons','All atoms become neutral molecules','Ionic bonds are electrostatic attractions between oppositely charged ions.']],
 homeostasis:[['What is homeostasis?','Regulation of internal conditions','The breakdown of rocks','The movement of tectonic plates','Homeostasis maintains internal conditions within suitable limits.']],
 inheritance:[['What is an allele?','An alternative form of a gene','A type of organ','A food molecule','Alleles are different versions of a gene.']],
 ecology:[['What is biodiversity?','Variety of living organisms','Only the number of predators','Only plant height','Biodiversity describes variety of life, including species and genetic variation.']],
 rates:[['What generally happens to reaction rate when temperature increases?','It increases','It always stops','It must stay unchanged','Higher temperature usually increases successful collision frequency.']],
 'organic-chemistry':[['What elements are present in all hydrocarbons?','Carbon and hydrogen','Carbon and oxygen only','Hydrogen and nitrogen only','Hydrocarbons contain only carbon and hydrogen.']],
 'chemical-analysis':[['What can chromatography help separate?','Components of a mixture','Protons from nuclei','Heat from light','Chromatography separates mixture components by differing movement through a medium.']],
 magnetism:[['Which two magnetic poles repel?','Two north poles','North and south','A north pole and iron always','Like magnetic poles repel; unlike poles attract.']],
 radiation:[['Which radiation is the most strongly ionising of alpha, beta and gamma?','Alpha','Beta','Gamma','Alpha particles are strongly ionising but have low penetration.']]
};
export function sciencePractice(topicId,{yearId='year-4',count=6,seed=0}={}){
 if(!scienceTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Science topic is not mapped to this year.');
 if(!Number.isInteger(count)||count<1||count>30||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const items=bank[topicId];
 if(!items?.length)throw Error('No starter questions for topic.');
 return Array.from({length:count},(_,i)=>{
  const [prompt,answer,wrongA,wrongB,explanation]=items[(i+seed)%items.length];
  const all=[answer,wrongA,wrongB];
  if(new Set(all).size!==3)throw Error('Duplicate answer options.');
  const rotation=(i+seed)%3;
  return {questionId:`${yearId}-${topicId}-${seed}-${i}`,yearId,topicId,prompt,answer,
   options:[...all.slice(rotation),...all.slice(0,rotation)],explanation,sourceStatus:'draft'};
 });
}
export function scienceContentCoverage(){
 return Object.entries(yearTopics).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,uniqueStarterQuestions:topics.reduce((sum,id)=>sum+(bank[id]?.length||0),0)
 }));
}
