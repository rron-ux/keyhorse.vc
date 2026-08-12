export const PAGES=[["industries","Industries"],["companies","Portfolio"],["media","Media"],
             ["resources","Resources"],["partners","Partners"],["about","About"]] as const;


export const CYC=['logistics and trade.','advanced manufacturing.','healthcare.',
           'energy and materials.','agriculture and food.','exceptional founders.'] as const;



export const FEED=[
 ['12 May','Beltways','Accelerating walkways','Hebron','$4.2M','Seed',true],
 ['06 May','[Company]','Industrial software','Louisville','$1.8M','Pre-seed',false],
 ['29 Apr','Cloverleaf','Team performance software','Covington','$8M','Series A',true],
 ['22 Apr','[Company]','Care logistics','Lexington','$3.1M','Seed',false],
 ['15 Apr','Bexion','Therapeutics','Covington','$12M','Series B',true],
 ['08 Apr','[Company]','Supply chain','Bowling Green','$900K','Pre-seed',false]] as const;

export const GOALS=[
 ['01','Be the first call','A founder raising in Kentucky should think of us before they think of anyone else.'],
 ['02','Be the record','The place people check to know what is happening in the state.'],
 ['03','Be the reason someone moves here','Sector coverage that makes the case before we ever make a pitch.'],
 ['04','Leave something behind','Published work, a data record, and an audience that outlasts any single fund.']] as const;

export const RELS=[
 ['KSTC','The Kentucky Science and Technology Corporation. Keyhorse is its venture arm; KSTC is the entity that holds and administers the funds.'],
 ['Cabinet for Economic Development','The Commonwealth agency we work alongside on programs, tax credits and company attraction.'],
 ['KYInnovation','The statewide network of accelerators, incubators and support organisations we invest through and co-programme with.'],
 ['U.S. Treasury','SSBCI capital carries federal reporting obligations. That transparency requirement is a foundation, not a burden.']] as const;

export const IND=[
 ['01','Logistics & Trade','The only state with three major air cargo hubs, and a one-day truck drive to two-thirds of the country.','kh-log',
  'Freight software · Supply chain visibility · Warehouse automation · Customs & trade compliance · Last-mile · Cold chain · Inland waterway · Fleet & telematics'],
 ['02','Advanced Manufacturing, Aerospace & Defense','6,000+ manufacturing facilities, 250,000+ workers, and roughly $19B in aerospace exports.','kh-mfg',
  'Industrial automation & robotics · Machine vision · Predictive maintenance · Industrial IoT · Digital twin · Additive · Advanced materials · Metals & foundry · Aerospace components · Dual-use defense'],
 ['03','Health & Care','Humana, Atria and Waystar all headquartered here, against a rural care gap that shows up early.','kh-health',
  'Payer infrastructure & claims · Revenue cycle automation · Prior-auth · Care navigation · Home & community care · Care labour matching · Remote monitoring · Senior living tech · Rural telemedicine'],
 ['04','Energy, Materials & Climate','$10B+ in EV battery investment, the largest primary aluminium capacity in the US, and some of the lowest energy rates.','kh-ev',
  'Grid-edge & battery intelligence · Energy storage · Critical minerals processing · Battery lifecycle & recycling · Industrial energy procurement · Carbon accounting · Efficiency retrofits'],
 ['05','Agriculture, Food & Consumer','69,425 farms, a $10.6B bourbon supply chain, and the global headquarters of quick service.','kh-ag',
  'Livestock health analytics · Farm management · Crop yield · Agricultural marketplaces · Food distribution · Barrel tracking & ageing analytics · Beverage & CPG · QSR supply chain · SAF feedstock']] as const;

export const ISEC=[
 ['Logistics & Trade',
  'Kentucky is the only state with three major air cargo hubs — UPS Worldport in Louisville, the DHL Americas hub, and Amazon\u2019s $1.5B Air Global Hub. Worldport runs 5.2 million square feet and 155 miles of conveyors at 416,000 packages an hour. The state sits within a one-day truck drive of roughly two-thirds of the US population, and more than 1,300 logistics companies employ about 84,000 people here.',
  ['Three major air cargo hubs','416,000 packages/hour at Worldport','5th-busiest cargo airport','1,300+ logistics companies · ~84,000 jobs','One-day drive to ~2/3 of the US'],
  'Freight and transportation software · Supply chain visibility and optimisation · Warehouse and distribution centre automation · Customs, trade and compliance · Last-mile and delivery · Cold chain · Reverse logistics · Inland waterway and multimodal transloading · Fleet and telematics',
  'The Worldport intelligence layer — customs automation, freight pricing intelligence and trade compliance AI for air cargo. Also barge-to-rail-to-truck transloading and autonomous river monitoring on the Ohio.','kh-log'],
 ['Advanced Manufacturing, Aerospace & Defense',
  'More than 6,000 manufacturing-related facilities employ over 250,000 workers, with roughly $28B of capital investment announced in five years. Toyota Georgetown is Toyota\u2019s largest assembly plant in the world. Aerospace runs to 100+ facilities and about $19B in exports. Fort Knox, Fort Campbell and Blue Grass Army Depot push roughly 5,000 technically trained veterans into the civilian workforce every year.',
  ['6,000+ facilities · 250,000+ workers','Toyota\u2019s largest plant globally · 350+ suppliers','100+ aerospace facilities · ~$19B exports 2024','~5,000 trained veterans entering annually','$28B capital investment in five years'],
  'Industrial automation and robotics · Machine vision and quality control · Predictive maintenance · Industrial IoT · Digital twin and production simulation · Additive manufacturing · Advanced materials and composites · Metals and foundry technology · Plastics and polymers · Aerospace components · Dual-use defense systems · Sustainment and depot software',
  'Predictive maintenance, computer-vision quality control, robotics workflow integration and digital twin simulators — proven on a real production floor rather than in a lab. Dual-use preferred on the defense side.','kh-mfg'],
 ['Health & Care',
  'Humana is headquartered in Louisville. So are Atria Senior Living, which manages more than 200 communities and roughly 35,000 residents, and Waystar. The 65+ share of the population rose from 13.3% in 2010 to 17% in 2020, and 43 of Kentucky\u2019s 120 counties are primary-care shortage areas. The Louisville Healthcare CEO Council gives health-tech startups direct pilot access inside Humana, Norton Healthcare and BrightSpring.',
  ['Humana, Atria and Waystar headquartered here','Atria: 200+ communities · ~35,000 residents','806,757 residents aged 65+ by 2023','43 of 120 counties are care shortage areas','Direct pilot access via the CEO Council'],
  'Payer infrastructure and claims · Revenue cycle automation · Prior-authorisation automation · Care navigation · Home and community-based care · Care labour matching and credentialing · Remote monitoring · Senior living technology · Rural telemedicine · Closed-loop pharmacy logistics',
  'Care infrastructure and the system of record — home health deployment infrastructure, closed-loop pharmacy logistics automation, care labour matching at scale. And the payer-provider trust layer: prior-auth automation and AI-native revenue cycle for post-acute care.','kh-health'],
 ['Energy, Materials & Climate',
  'More than ten billion dollars has been committed to EV battery manufacturing here, including the $5.8B BlueOval SK project. Industrial energy rates are among the lowest in the country, which is why the state hosts 180+ aluminium and copper facilities employing over 21,000 people and holds the largest primary aluminium capacity in the United States.',
  ['$10B+ EV battery investment','BlueOval SK: $5.8B','180+ aluminium & copper facilities · 21,000+ jobs','Largest primary aluminium capacity in the US','~$2.7B new metals investment since 2017'],
  'Grid-edge and battery intelligence · Energy storage · Critical minerals and materials processing · Battery lifecycle and recycling · Industrial energy procurement · Carbon accounting · Efficiency retrofits · Post-coal land and grid infrastructure intelligence',
  'Grid-scale battery intelligence for data centre and utility applications, aluminium and critical materials process optimisation, and industrial energy procurement AI.','kh-ev'],
 ['Agriculture, Food & Consumer',
  'Kentucky has 69,425 farms across roughly half of its 25.8 million acres, and is the largest beef-cattle producer east of the Mississippi. The bourbon supply chain adds about $10.6B in economic output and supports nearly 24,000 jobs, with 17.1 million barrels ageing in the state. Louisville is the global headquarters of quick service — Yum! Brands and RSCS, the largest procurement cooperative in the industry.',
  ['69,425 farms · 25.8M acres','Largest beef producer east of the Mississippi','Bourbon: ~$10.6B output · 17.1M barrels','Equine: $2.99B output · 40,665 jobs','Yum! Brands and RSCS headquartered here'],
  'Livestock health analytics · Farm management platforms · Crop yield prediction · Agricultural marketplaces · Food distribution optimisation · Barrel tracking and ageing analytics · Beverage and CPG production · QSR supply chain and food-service CPG · Sustainable aviation fuel feedstock',
  'QSR supply chain products built for the world\u2019s largest restaurant networks, limestone-water beverage brands, and agri-wellness verticals that turn legacy agriculture into higher-margin categories.','kh-ag']] as const;

export const AUD=[
 ['I want to build here','Founder',
  'Six sectors where Kentucky has infrastructure, customers and a workforce that competitors cannot replicate remotely. Read what we are looking for in each, then apply to the fund that fits.',
  [['The industries','industries'],['Apply','apply']]],
 ['I am looking for work','Talent',
  'The companies hiring here, what they are building, and why senior operators are choosing to move. Every round we report names the company — start there.',
  [['Companies','companies'],['The record','record']]],
 ['I want access to what is happening','Corporate',
  'Every disclosed round in the Commonwealth, the funds forming, the programs opening. If you want pilot partners or early sight of deal flow in your category, become a partner.',
  [['Partners','partners'],['Media','media']]],
 ['I want to invest','Investor',
  'Co-investors, angels and prospective LPs. Kentucky angel credits run up to 40%, and our coverage is the earliest look at what is forming here.',
  [['Partners','partners'],['About','about']]]] as const;

export const FUNDS_GEN=[
 ['Discovery Fund','Programmatic investments made through partner accelerators, incubators and pitch competitions. The earliest capital we deploy.','kh-f1','Pre-seed · via partner programs'],
 ['Kentucky Enterprise Fund','Direct investment into validated tech-enabled startups. Evergreen, funded by the Commonwealth.','kh-f2','Pre-seed / Seed · direct'],
 ['KSBCI','Larger direct positions in companies with revenue and traction, with reserves held for follow-on. Funded through the U.S. Treasury SSBCI programme.','kh-f3','Seed / Series A+ · direct']] as const;

export const FUNDS3=[
 {k:'Programmatic',n:'Discovery Fund',c:'Pre-seed',cl:'Stage',
  d:'Invested through partner accelerator, incubator and pitch-competition cohorts.',
  cr:['Enrolled in a partner program','Tech-enabled and Kentucky-based','Earliest capital we deploy']},
 {k:'Direct',n:'Kentucky Enterprise Fund',c:'Pre-seed / Seed',cl:'Stage',
  d:'Direct investment into validated tech-enabled startups. Evergreen, funded by the Commonwealth.',
  cr:['Validated prototype or MVP','Evidence of demand','Path to revenue','Kentucky HQ or relocating']},
 {k:'Direct',n:'KSBCI',c:'Seed / Series A+',cl:'Stage',
  d:'Larger direct positions in companies with revenue and traction, with reserves held for follow-on. Funded through the U.S. Treasury SSBCI programme.',
  cr:['Revenue and repeatable traction','Customers beyond a local market','Institutional round forming','Employment potential in-state']}] as const;

export const PARTNERS=[
 ['Accelerators & ESOs',['[ESO name]','[ESO name]','[ESO name]','[ESO name]','[ESO name]']],
 ['Universities',['[University]','[University]','[University]']],
 ['Corporate partners',['[Corporate]','[Corporate]','[Corporate]','[Corporate]']],
 ['Angels & investors',['[Angel group]','[Co-investor]','[Co-investor]']],
 ['State & regional',['KSTC','Cabinet for Economic Development','KYInnovation']]] as const;

export const JOIN=[
 ['Run a program','Accelerators, incubators and pitch competitions we can invest through.'],
 ['Corporate partner','Pilot customers, venture partners and category expertise.'],
 ['Angel investor','Join the syndicate, and the state credits that come with it.'],
 ['Prospective LP','Early conversations about private vehicles as they are built.']] as const;

export const SOCIALS=[
 ['Instagram','@keyhorsecapital','Deal cards, founder faces, sessions. The record, made scrollable.','6.8K'],
 ['LinkedIn','Keyhorse Capital','Where founders and co-investors actually are. Team accounts amplify.','4.2K'],
 ['X','@keyhorsecapital','Rounds as they break, plus the pattern behind them.','2.1K'],
 ['YouTube','Keyhorse Capital','Full sessions and founder features. The library everything points to.','1.4K']] as const;

export const CAL=[
 ['14','May','Raising your first institutional round','Venture Session · Keyhorse','Story Louisville','own'],
 ['22','May','[Demo day name]','Cohort showcase','[ESO name], Lexington',''],
 ['04','Jun','Logistics tech, in the state that moves everything','Venture Session · Keyhorse','Covington','own'],
 ['11','Jun','[Pitch competition]','Statewide competition','[Host], Bowling Green',''],
 ['19','Jun','[Ecosystem summit]','Annual gathering','[Host], Lexington',''],
 ['09','Jul','Care at scale: building for the 65+','Venture Session · Keyhorse','Louisville','own']] as const;

export const EXT=[
 ['StartupKY Navigator','Notion','The statewide map of programs, funders and support organisations. Built by us, open to everyone.','keyhorse.notion.site'],
 ['InnovateKentucky','External','The KYInnovation network — regional hubs, programs and state resources across the Commonwealth.','innovatekentucky.org'],
 ['Regional front doors','Network','Amplify (Louisville) · Awesome Inc (Lexington) · Blue North (Covington) · CREATE (Bowling Green) · Sprocket (Paducah) · SOAR (Pikeville).',''],
 ['Angel & investor networks','Network','Bluegrass Angels · Kentucky Angels · Louisville Angel Network · Tri-State Angel Investment Group · Appalachian Investors Alliance.','']] as const;

export const RESCATS=[
 ['01','Frameworks','Diligence checklists, term sheet primers and the scorecards we actually use.'],
 ['02','Video','Session recordings, founder features and short explainers.'],
 ['03','Sessions','Live workshops across the Commonwealth. Free and open to any founder.'],
 ['04','Tools','Cap table, model and data room templates you can copy.']] as const;

export const RESOURCES=[
 ['Framework','Investment Process Checklist','Every diligence item and task, stage by stage.'],
 ['Framework','Term sheet primer','Plain-English walkthrough of the terms you will see from us.'],
 ['Report','Kentucky Venture Report','The annual record of every round, fund and program in the state.'],
 ['Video','Raising your first round — full session','Recording, slides and takeaways.'],
 ['Video','Founder features','Long-form profiles of companies building here.'],
 ['Session','Venture Sessions calendar','Where we will be next, and how to register.'],
 ['Tool','Cap table template','A clean starting point with common scenarios modelled.'],
 ['Tool','Data room checklist','What to have ready before diligence starts.'],
 ['Report','Kentucky ecosystem map','Accelerators, universities, support organisations and co-investors.']] as const;

export const COS=[
 ["AboutBit","Software","Lexington","active"],["ADEM","Advanced materials","Lexington","active"],
 ["Affinna","Life sciences","Louisville","active"],["Airtrek Robotics","Robotics","Lexington","active"],
 ["Allylix","Biotechnology","Lexington","exit"],["Alt Distilling","Consumer","Louisville","active"],
 ["Another Nine","Consumer","Louisville","active"],["Apellis","Therapeutics","Crestwood","exit"],
 ["Applied Industrials","Industrial AI","Louisville","active"],["Aptamera","Therapeutics","Louisville","legacy"],
 ["AquiSense","Water technology","Covington","active"],["Aurasense","Sensing","Lexington","active"],
 ["AuthoFi","Fintech","Louisville","active"],["Avana Health","Health services","Lexington","active"],
 ["Bailout Systems","Safety","Louisville","active"],["BehaVR","Digital therapeutics","Elizabethtown","active"],
 ["Beltways","Accelerating walkways","Hebron","active"],["Besti Co.","Consumer","Louisville","active"],
 ["Bexion","Therapeutics","Covington","active"],["BeyondWill","Legal technology","Louisville","active"],
 ["BioGlitz","Consumer","Lexington","active"],["Biscuit Belly","Consumer","Louisville","active"],
 ["Cloverleaf","Software","Covington","active"],["Ceptaris","Therapeutics","Louisville","exit"],
 ["Content Credits","Media","Louisville","active"]] as const;

export const POSTS=[
 {k:'story',t:'They moved the company from Silicon Valley to a factory two miles from the airport',d:'05 / 2026'},
 {k:'note',t:'Third Northern Kentucky hardware round this quarter',d:'05 / 2026'},
 {k:'deal',t:'Beltways raises $4.2M Seed',d:'05 / 2026'},
 {k:'note',t:'What the state actually pays for, and who qualifies',d:'04 / 2026'},
 {k:'story',t:'Hiring engineers when you are not in a tech city',d:'04 / 2026'},
 {k:'deal',t:'Cloverleaf raises $8M Series A',d:'04 / 2026'}] as const;

export const STATS=[['$100M+',100,'M+','$','Invested in Kentucky companies'],
 ['$3.3B+',3.3,'B+','$','Follow-on capital raised'],
 ['600+',600,'+','','Companies funded'],
 ['800+',800,'+','','Jobs created, active portfolio']] as const;

export const STEPS=[["01","Apply","Submit the form. Every applicant hears back, either way."],
 ["02","Screening","Reviewed against published criteria and fit with a specific fund."],
 ["03","Intro call","A conversation about the company, the round and the timing."],
 ["04","Data room","Financials, metrics, cap table, customers and legal."],
 ["05","Diligence call","A deeper session with the team, plus reference calls."],
 ["06","Investment committee","The committee reviews the file and votes."],
 ["07","Decision","Terms and documentation, or a clear no with the reason."]] as const;

export const TEAM=[["Kelby Price","Managing Partner","Investment committee"],
 ["Autumn Rice","Director of Operations","Fund operations"],
 ["Eugene Yang","Fund Operations Director","Reporting & compliance"],
 ["Devin Morris","Strategic Communications","Editorial"],
 ["Bobby Riley","Platform Manager","Portfolio support"],
 ["Rron Thaci","Associate","Sourcing & diligence"],
 ["Zimri Rodriguez","Venture Programs Coordinator","Sessions & programs"],
 ["Aditya Padmaraj","Analyst","Market data"]] as const;

/* ── Homepage pillars (accordion) ── */
export const PILLARS=[
 {n:'01',nm:'Logistics & Trade',c:'#00A8E1',seed:'kh-log',
  d:'Three major air cargo hubs and a one-day truck drive to two-thirds of the country.',co:'38 companies'},
 {n:'02',nm:'Advanced Manufacturing',c:'#0E7C86',seed:'kh-mfg',
  d:'6,000+ facilities, 250,000+ workers, and roughly $19B in aerospace exports.',co:'52 companies'},
 {n:'03',nm:'Health & Care',c:'#7A5CF0',seed:'kh-health',
  d:'Humana, Atria and Waystar headquartered here, against a rural care gap that shows up early.',co:'47 companies'},
 {n:'04',nm:'Energy & Materials',c:'#E86A2B',seed:'kh-ev',
  d:'$10B+ in EV battery investment and the largest primary aluminium capacity in the US.',co:'29 companies'},
 {n:'05',nm:'Agriculture & Food',c:'#3F9B45',seed:'kh-ag',
  d:'69,425 farms, a $10.6B bourbon supply chain, and the global headquarters of quick service.',co:'34 companies'}] as const;

/* ── Founder marquee ── */
export const FOUNDERS=[
 'Beltways','Cloverleaf','Bexion','AquiSense','AuthoFi','Airtrek Robotics',
 'BehaVR','Applied Industrials','Avana Health','Alt Distilling','Another Nine','Besti Co.',
 'BeyondWill','Content Credits','Biscuit Belly','ADEM','Affinna','AboutBit'] as const;

/* ── Homepage media cards ── */
export const MEDIA3=[
 {k:'Feature',c:'#00A8E1',t:'They moved the company from Silicon Valley to a factory two miles from the airport',d:'05 / 2026'},
 {k:'Market note',c:'#E86A2B',t:'Third Northern Kentucky hardware round this quarter',d:'05 / 2026'},
 {k:'Round',c:'#3F9B45',t:'Beltways raises a Seed round led by an out-of-state fund',d:'05 / 2026'}] as const;

/* ── Capital closing section ── */
export const CAPROWS=[
 ['01','Discovery Fund','Programmatic, earliest capital — invested through partner programs.'],
 ['02','Kentucky Enterprise Fund','Direct investment into validated tech-enabled startups.'],
 ['03','KSBCI','Larger direct positions in companies with revenue and traction.']] as const;

/* ── Partner category colours ── */
export const PARTNER_COLORS: Record<string,string> = {
 'Accelerators & ESOs':'#00A8E1','Universities':'#7A5CF0','Corporate partners':'#0E7C86',
 'Angels & investors':'#E86A2B','State & regional':'#3F9B45'};
