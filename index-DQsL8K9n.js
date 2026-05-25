// The full activity engine. Mommy Mode picks from this pool.
// Each activity has everything needed to render a quest door.

export const activities = [
  {
    id: 'ACT-001', name: 'Harry Potter Kano Wand', category: 'Tech & Code',
    world: 'Tech Sorceress Tower', moods: ['Business Boss', 'Tech Sorceress'],
    mess: 'Green', adultHelp: 'Solo', setup: '10 minutes', cleanup: 'Tiny Reset',
    dopamine: '10-Minute Payoff', supplies: 'Kano kit, iPad',
    quick: 'Build the physical wand', stretch: 'Code a floating feather',
    boss: 'Program custom spells based on wrist rotation',
    proTip: 'Keep the wand perfectly flat when calibrating the gyroscope, or your spells will drift wildly on screen.',
    videoUrl: 'https://www.youtube.com/results?search_query=Harry+Potter+Kano+Coding+Kit+gameplay',
    safety: 'None', location: 'iPad / Digital',
    role: 'Tech sorceress',
    storyPrompt: 'The tower needs one new spell powered by harry potter kano wand.',
    mission: 'Make the smallest working version first.',
    plotTwist: 'The spell must unlock another weekly world.',
    bossLevel: 'Create a demo, title it, and show someone how it works.',
    galleryCaption: 'Harry Potter Kano Wand spell recorded in the tower archive.',
    twixSays: 'Screen time, but make it sorcery.',
    badge: 'Tech Sorceress', askMom: true, momFlags: ['ipad']
  },
  {
    id: 'ACT-002', name: 'Acrylic Keychain Shop', category: 'Business & Maker',
    world: "Kali's Creations Grand Opening", moods: ['Business Boss', 'Puppy/Twix'],
    mess: 'Yellow', adultHelp: 'Setup Help', setup: '10 minutes', cleanup: 'Table Wipe / Sink',
    dopamine: 'Instant Wow', supplies: 'Acrylic blanks, paint pens, tassels',
    quick: 'Paint a Twix portrait', stretch: 'Make backpack tags for the Heist crew',
    boss: 'Draw stained glass mandalas',
    proTip: 'Peel the invisible plastic film off BOTH sides of the blank before painting, or the paint will flake off tomorrow!',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+paint+acrylic+keychains',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Founder + product designer',
    storyPrompt: "Twix's boutique shelves are empty and the grand opening is today.",
    mission: 'Create the first product drop: one keychain for you, one for Twix, and one mystery-customer design.',
    plotTwist: 'One customer is secretly in the Heist Crew and needs a hidden symbol worked into the design.',
    bossLevel: 'Make packaging, price tags, and one official product photo.',
    galleryCaption: "First official drop from Kali's Creation Station.",
    twixSays: 'Tiny CEO behavior detected.',
    badge: 'Studio Founder', askMom: true, momFlags: []
  },
  {
    id: 'ACT-003', name: 'Sparkly Jewelry Box', category: 'Focus Craft',
    world: "Kali's Creations Grand Opening", moods: ['Cozy', 'Sparkly'],
    mess: 'Green', adultHelp: 'Setup Help', setup: '10 minutes', cleanup: 'Table Wipe / Sink',
    dopamine: 'Slow Build', supplies: 'Wooden box, 1500+ gems, glue',
    quick: 'Make it the Heist Vault', stretch: 'Create symmetrical concentric mandalas',
    boss: 'Color block the drawers',
    proTip: 'If the gems are stickers, they will fall off wood. Add a tiny dot of B7000 glue to make them permanent.',
    videoUrl: 'https://www.youtube.com/results?search_query=bedazzling+rhinestone+placement+techniques',
    safety: 'Glue', location: 'Kali Closet / Table',
    role: 'Vault decorator',
    storyPrompt: 'The studio needs a sparkly vault for tiny treasures, badges, and secret product samples.',
    mission: 'Turn the jewelry box into the Heist Vault or the Founder\'s Treasure Chest.',
    plotTwist: 'A tiny priceless object needs a special secret drawer.',
    bossLevel: 'Create a vault label, organize treasures by category, and photograph the reveal.',
    galleryCaption: 'The first official treasure vault of the studio.',
    twixSays: 'Sparkle with purpose. Chaos with containment.',
    badge: 'Studio Founder', askMom: true, momFlags: ['glue']
  },
  {
    id: 'ACT-004', name: 'Suncatcher Window Art', category: 'Art & Optics',
    world: 'Cookie Café Gallery', moods: ['Builder', 'Business Boss', 'Sparkly'],
    mess: 'Yellow', adultHelp: 'Setup Help', setup: '10 minutes', cleanup: 'Table Wipe / Sink',
    dopamine: 'Instant Wow', supplies: 'Suncatcher frames, squeeze paints',
    quick: 'Make stained glass for the Lego town', stretch: 'Decorate the patio doors for the Luau',
    boss: 'Toothpick color-blending',
    proTip: 'If a paint tube clogs, do NOT squeeze harder or it will explode. Poke a paperclip down the nozzle to clear it.',
    videoUrl: 'https://www.youtube.com/results?search_query=window+art+paint+toothpick+blending',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Stained-glass artist',
    storyPrompt: 'The gallery window is boring and the Cookie Café needs a magical storefront.',
    mission: 'Create one suncatcher that tells visitors what kind of world they are entering.',
    plotTwist: 'The sun reveals a secret clue when the window art glows.',
    bossLevel: 'Make a matched set of 3 window pieces for Gallery, Café, and Puppy Palace.',
    galleryCaption: 'Sunlight-powered art for the summer gallery.',
    twixSays: 'This belongs in a window immediately.',
    badge: 'Tiny CEO', askMom: true, momFlags: []
  },
  {
    id: 'ACT-005', name: 'Punch Needle Art', category: 'Textiles',
    world: 'Cozy Craft Cabin', moods: ['Cozy', 'Puppy/Twix', 'Sparkly'],
    mess: 'Green', adultHelp: 'Setup Help', setup: '5 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Slow Build', supplies: 'Monks cloth, punch needle, yarn hoop',
    quick: 'Make fluffy mug rugs', stretch: 'Punch a denim jacket patch',
    boss: 'Tactile initial for your door',
    proTip: 'Keep the needle punched ALL the way down to the handle on every single stitch, or the loops will pull out.',
    videoUrl: 'https://www.youtube.com/results?search_query=punch+needle+for+beginners',
    safety: 'Needle', location: 'Kali Closet / Table',
    role: 'Texture designer',
    storyPrompt: 'Twix has requested something fluffy, official, and slightly fancy for the studio.',
    mission: 'Punch a small texture patch, mug rug, or door initial.',
    plotTwist: 'The texture has to feel like a secret code if someone closes their eyes.',
    bossLevel: 'Make a finished tactile patch and name it like a boutique product.',
    galleryCaption: 'A cozy texture artifact from the craft cabin.',
    twixSays: 'Soft work is still serious work.',
    badge: 'Twix Approved', askMom: true, momFlags: ['needle']
  },
  {
    id: 'ACT-006', name: 'Stop-Motion Studio', category: 'Tech & Film',
    world: 'Tech Sorceress Tower', moods: ['Business Boss', 'Puppy/Twix', 'Tech Sorceress'],
    mess: 'Green', adultHelp: 'Solo', setup: '10 minutes', cleanup: 'Tray Reset',
    dopamine: '10-Minute Payoff', supplies: 'iPad, any toys or Legos',
    quick: 'Animate Lego minifigs', stretch: 'Do a magic trick (make an object disappear)',
    boss: 'Animate alphabet beads spelling your name',
    proTip: 'The iPad cannot move. Prop it against a heavy book. Tap the screen to lock focus before you start shooting.',
    videoUrl: 'https://www.youtube.com/results?search_query=stop+motion+basics+for+kids+tutorial',
    safety: 'None', location: 'iPad / Digital',
    role: 'Director + effects sorceress',
    storyPrompt: 'Twix has wandered into a tiny movie scene and only stop-motion magic can explain what happens next.',
    mission: 'Animate one object appearing, disappearing, or moving by itself.',
    plotTwist: 'The object is a clue for the Heist Crew.',
    bossLevel: "Make a 20-second trailer for Kali's Creation Station.",
    galleryCaption: 'First official micro-movie from the studio.',
    twixSays: 'Screen time, but make it suspiciously productive.',
    badge: 'Tech Sorceress', askMom: true, momFlags: ['ipad']
  },
  {
    id: 'ACT-009', name: 'Loom Band Engineering', category: 'Wearables',
    world: "Kali's Creations Shop", moods: ['Builder', 'Business Boss'],
    mess: 'Green', adultHelp: 'Solo', setup: '0-2 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Giftable / Replayable', supplies: 'Rubber bands, Y-loom, hook, S-clips',
    quick: 'Weave a thick Dragon Scale cuff', stretch: "Wrap Twix's leash handle",
    boss: 'Make a rubber band bouncy ball',
    proTip: 'Push all the bands DOWN to the bottom of the pegs before adding a new layer so they don\'t pop off.',
    videoUrl: 'https://www.youtube.com/results?search_query=dragon+scale+loom+band+tutorial',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Tiny CEO',
    storyPrompt: 'The shop needs a new product line: Loom Band Engineering.',
    mission: 'Make one item that could be sold, gifted, or displayed.',
    plotTwist: 'A mystery customer needs a custom version.',
    bossLevel: 'Package it, price it, and photograph it.',
    galleryCaption: 'Loom Band Engineering product drop.',
    twixSays: 'Tiny CEO mode: activated.',
    badge: 'Tiny CEO', askMom: true, momFlags: []
  },
  {
    id: 'ACT-013', name: 'Seed Bead Art', category: 'Wearables',
    world: "Kali's Creations Shop", moods: ['Business Boss', 'Cozy', 'Sparkly'],
    mess: 'Green', adultHelp: 'Setup Help', setup: '5 minutes', cleanup: 'Tray Reset',
    dopamine: '10-Minute Payoff', supplies: 'Seed beads, elastic, needles',
    quick: 'Daisy chain bracelets', stretch: 'Cherry charm rings',
    boss: 'Morse code secret message bracelets',
    proTip: 'Do not bead on a hard table; they bounce. Lay a piece of felt or a fuzzy towel down as your workspace.',
    videoUrl: 'https://www.youtube.com/results?search_query=daisy+seed+bead+bracelet+tutorial+easy',
    safety: 'Needle', location: 'Kali Closet / Table',
    role: 'Jewelry designer',
    storyPrompt: 'A customer has requested tiny wearable magic, and the shop needs inventory.',
    mission: 'Make one bracelet, ring, or charm with a clear color story.',
    plotTwist: 'Hide a Morse-code or symbol message inside the design.',
    bossLevel: 'Create a mini collection of three pieces with names and prices.',
    galleryCaption: "Wearable inventory from Kali's Creations Shop.",
    twixSays: 'Small beads. Big empire.',
    badge: 'Tiny CEO', askMom: true, momFlags: ['needle']
  },
  {
    id: 'ACT-014', name: 'Spy Fingerprints', category: 'Forensics',
    world: 'Heist Crew HQ', moods: ['Heist Crew', 'Science'],
    mess: 'Yellow', adultHelp: 'Nearby', setup: '5 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Giftable / Replayable', supplies: 'Fingerprint kit, tape, paper',
    quick: "Catalog the whole family's prints", stretch: "Get Twix's nose print",
    boss: 'Lift prints off a glass for the Heist case file',
    proTip: "Use clear packing tape to 'lift' the dusted print off the glass, then stick it to a white piece of paper to see it perfectly.",
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+dust+and+lift+fingerprints+kids',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Burglar crew evidence specialist',
    storyPrompt: 'Important correction: this is not detective training. You are the burglars preparing the perfect heist.',
    mission: 'Collect or create fingerprints so the crew can plant clues, misdirect adults, or build disguises.',
    plotTwist: 'One print belongs to the "inside dog" who may or may not be Twix.',
    bossLevel: 'Build a Heist File with prints, aliases, entry plan, and getaway note.',
    galleryCaption: 'Official prep file from the Heist Crew.',
    twixSays: 'Allegedly, I saw nothing.',
    badge: 'Heist Crew', askMom: true, momFlags: []
  },
  {
    id: 'ACT-015', name: 'Spirograph Math Art', category: 'Art & Optics',
    world: 'Sparkle Studio', moods: ['Builder', 'Sparkly'],
    mess: 'Green', adultHelp: 'Solo', setup: '0-2 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Slow Build', supplies: 'Spirograph tin, pens, putty',
    quick: 'Make custom stationery cards', stretch: 'Draw complex mandalas and watercolor them',
    boss: 'Map planet orbits',
    proTip: 'You MUST stick the outer ring down with putty, and hold your pen perfectly straight up and down (90 degrees).',
    videoUrl: 'https://www.youtube.com/results?search_query=spirograph+tips+and+tricks+stop+slipping',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Math artist',
    storyPrompt: 'The gallery needs hypnotic art that looks like it came from a secret machine.',
    mission: 'Make one clean Spirograph design and choose its title.',
    plotTwist: 'The pattern is actually a map, portal, or lock code.',
    bossLevel: 'Make a set of 3 designs and turn them into stationery or gallery cards.',
    galleryCaption: 'Rotational magic for the gallery wall.',
    twixSays: 'This is math wearing a fancy hat.',
    badge: 'Twix Approved', askMom: true, momFlags: []
  },
  {
    id: 'ACT-011', name: 'Procreate Mandalas', category: 'Digital Art',
    world: 'Tech Sorceress Tower', moods: ['Business Boss', 'Sparkly', 'Tech Sorceress'],
    mess: 'Green', adultHelp: 'Solo', setup: '10 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Slow Build', supplies: 'iPad, Apple Pencil, Procreate App',
    quick: 'Turn on Radial Symmetry to draw perfect mandalas', stretch: 'Trace photos of Twix',
    boss: "Sketch Kali's Creations logos",
    proTip: 'Always draw the background and your main drawing on different layers! That way you can erase without ruining the sky.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+draw+mandalas+in+procreate+symmetry',
    safety: 'None', location: 'iPad / Digital',
    role: 'Digital artist + logo mage',
    storyPrompt: 'The studio needs a symbol powerful enough to go on tags, signs, menus, and gallery cards.',
    mission: 'Create 3 logo or badge ideas in Procreate.',
    plotTwist: 'One version is the public logo; one is the secret Heist Crew mark.',
    bossLevel: 'Make a full brand set: logo, Twix Approved badge, and thank-you card.',
    galleryCaption: 'Digital branding spell from Tech Sorceress Tower.',
    twixSays: 'Layer discipline is sorcery.',
    badge: 'Tech Sorceress', askMom: true, momFlags: ['ipad']
  },
  {
    id: 'ACT-021', name: 'Aquabeads Pixel Art', category: 'Focus Craft',
    world: 'Cozy Craft Cabin', moods: ['Cozy', 'Sparkly'],
    mess: 'Yellow', adultHelp: 'Setup Help', setup: '10 minutes', cleanup: 'Table Wipe / Sink',
    dopamine: 'Giftable / Replayable', supplies: 'Aquabeads, pegboards, spray bottle',
    quick: 'Make Minecraft items', stretch: 'Build drink coasters',
    boss: 'Make 3D boxes that snap together',
    proTip: 'Spray generously, but wait 45-60 minutes before peeling. Put a heavy book on them if they curl while drying.',
    videoUrl: 'https://www.youtube.com/results?search_query=3D+perler+bead+box+tutorial',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Pixel builder',
    storyPrompt: 'The studio has received an order for tiny pixel objects from another dimension.',
    mission: 'Make one pixel charm, coaster, or Minecraft-inspired object.',
    plotTwist: 'The object unlocks a room in another weekly world.',
    bossLevel: 'Build a 3D box or mini display piece.',
    galleryCaption: 'Pixel artifact from the cozy cabin.',
    twixSays: 'Wait before peeling. Impatience is the villain.',
    badge: 'Twix Approved', askMom: true, momFlags: []
  },
  {
    id: 'ACT-023', name: 'Fort Engineering', category: 'Engineering',
    world: 'Heist Crew HQ', moods: ['Builder', 'Heist Crew', 'Science'],
    mess: 'Yellow', adultHelp: 'Nearby', setup: '10 minutes', cleanup: 'Tiny Reset',
    dopamine: '10-Minute Payoff', supplies: 'Fort kits, wood dome, blankets, glow tape',
    quick: 'Build a hallway laser maze with glow tape', stretch: 'Combine 3 kits for a mega-dome',
    boss: 'Set up a foam-blaster target range',
    proTip: 'Match the sphere holes correctly. Some are 90 degrees (cubes), some are 45 degrees (roofs). Triangles equal strength.',
    videoUrl: 'https://www.youtube.com/results?search_query=epic+indoor+fort+building+ideas+kids',
    safety: 'None', location: 'Game Room / Floor',
    role: 'Burglar base architect',
    storyPrompt: 'The burglars need a hideout, laser maze, or getaway tunnel before the heist can begin.',
    mission: 'Build one fort structure with a purpose.',
    plotTwist: 'The fort must include an entrance adults would overlook.',
    bossLevel: 'Create a full Heist HQ with checkpoint, stash, and escape route.',
    galleryCaption: 'Burglar base built and operational.',
    twixSays: 'If it collapses, it was a dramatic plot twist.',
    badge: 'Heist Crew', askMom: true, momFlags: []
  },
  {
    id: 'ACT-029', name: 'Analog Animation (Gifeez)', category: 'Art & Optics',
    world: 'Tech Sorceress Tower', moods: ['Builder', 'Puppy/Twix', 'Sparkly', 'Tech Sorceress'],
    mess: 'Green', adultHelp: 'Solo', setup: '0-2 minutes', cleanup: 'Tiny Reset',
    dopamine: '10-Minute Payoff', supplies: 'Gifeez spinner, paper discs, markers',
    quick: 'Animate Twix running', stretch: 'Spin primary colors to mix them',
    boss: 'Morph a circle into a star',
    proTip: 'Outline your characters in heavy black marker before coloring them in, otherwise they blur into a smudge when spinning.',
    videoUrl: 'https://www.youtube.com/results?search_query=gifeez+spin+art+animation+demo',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Animation illusionist',
    storyPrompt: 'Twix has discovered an old-school animation portal.',
    mission: 'Make one spinning animation disc that changes as it moves.',
    plotTwist: 'The image reveals a clue only while spinning.',
    bossLevel: 'Create a mini animation set: before, transformation, after.',
    galleryCaption: 'Analog animation spell activated.',
    twixSays: 'Heavy outlines. Otherwise the portal eats the details.',
    badge: 'Tech Sorceress', askMom: true, momFlags: []
  },
  {
    id: 'ACT-019', name: 'Holographic Sticker Bombing', category: 'Art & Decor',
    world: "Kali's Creations Grand Opening", moods: ['Builder', 'Sparkly'],
    mess: 'Green', adultHelp: 'Solo', setup: '0-2 minutes', cleanup: 'Tiny Reset',
    dopamine: 'Instant Wow', supplies: 'Holographic stickers, blanks (notebook/bottle)',
    quick: 'Cover an old tech case in stickers', stretch: 'Reskin a water bottle',
    boss: 'Build a "Good Day" jar',
    proTip: 'Overlap the white borders of the stickers so only the holographic art shows. Work from the center outward.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+sticker+bomb+laptop+case',
    safety: 'None', location: 'Kali Closet / Table',
    role: 'Sticker stylist',
    storyPrompt: 'The studio needs a visual identity that screams tiny founder energy.',
    mission: 'Sticker-bomb one object, case, bottle, or jar with a clear theme.',
    plotTwist: 'One sticker must be a secret signal only the crew understands.',
    bossLevel: 'Create a Good Day Jar or official Studio Supply Jar.',
    galleryCaption: 'Sticker identity system deployed.',
    twixSays: 'Overlap the borders. Hide the chaos.',
    badge: 'Studio Founder', askMom: true, momFlags: []
  }
];

// Mood → Twix illustration mapping
export const moodTwixImage = {
  'Sparkly': '/01_art_studio_twix.png',
  'Cozy': '/05_dreamy_meadow_twix.png',
  'Builder': '/06_crown_cushion_twix.png',
  'Business Boss': '/02_royal_reward_twix.png',
  'Heist Crew': '/07_peeking_logo_twix.png',
  'Tech Sorceress': '/03_cloud_wink_twix.png',
  'Science': '/04_meadow_wink_twix.png',
  'Puppy/Twix': '/00_welcome_twix.png',
  'Surprise Me': '/01_art_studio_twix.png'
};

// Mood → Twix messages
export const twixMessagesByMood = {
  Sparkly: {
    line: 'Sparkle protocol is active. Pick a door and make it legendary.',
    subtitle: 'Glittery details count. Tiny finishes = royal quality.'
  },
  Cozy: {
    line: 'Cozy kingdom day. Soft pace, big imagination.',
    subtitle: 'Start small, stay warm, and finish one lovely thing.'
  },
  Builder: {
    line: 'Builder brain is online. Let story and structure team up.',
    subtitle: 'One strong build moment beats five half-finished starts.'
  },
  'Business Boss': {
    line: 'Boss mode activated. If it has a tag, it is official.',
    subtitle: 'Name it, package it, then photograph like a product drop.'
  },
  'Heist Crew': {
    line: 'Crew briefing: we are absolutely the burglars.',
    subtitle: 'Disguises, clues, routes, and a dramatic loot reveal.'
  },
  'Tech Sorceress': {
    line: 'Tech Sorceress Tower is glowing. Code and craft can coexist.',
    subtitle: 'Magic today may involve stop motion, iPad art, or 3D ideas.'
  },
  Science: {
    line: 'Science Dock requests one curious experiment.',
    subtitle: 'Test, observe, and tell the story of what happened.'
  },
  'Puppy/Twix': {
    line: 'Twix patrol says keep it playful and finish with style.',
    subtitle: 'Quick wins first. Then earn your Twix Approved stamp.'
  },
  'Surprise Me': {
    line: 'Mystery door protocol. I picked chaos, but curated chaos.',
    subtitle: 'Pick 3, Mommy helps choose 1.'
  }
};

export const moodEmoji = {
  'Sparkly': '✨',
  'Cozy': '🧸',
  'Builder': '🔨',
  'Business Boss': '👑',
  'Heist Crew': '🕵️',
  'Tech Sorceress': '🔮',
  'Science': '🔬',
  'Puppy/Twix': '🐾',
  'Surprise Me': '🎲'
};

export const moodColors = {
  'Sparkly': { accent: '#f9c8d8', bg: '#fff5f8' },
  'Cozy': { accent: '#f8e58c', bg: '#fffcf0' },
  'Builder': { accent: '#8fe9d7', bg: '#f0fdf9' },
  'Business Boss': { accent: '#bfd3ff', bg: '#f0f5ff' },
  'Heist Crew': { accent: '#dccdf7', bg: '#f8f4ff' },
  'Tech Sorceress': { accent: '#b8d6ff', bg: '#f0f6ff' },
  'Science': { accent: '#b9f0da', bg: '#f0fdf6' },
  'Puppy/Twix': { accent: '#ffd6a8', bg: '#fff8f0' },
  'Surprise Me': { accent: '#e6d9ff', bg: '#f8f4ff' }
};

export const messColors = {
  'Green': '#b9f0da',
  'Yellow': '#f8e58c',
  'Red': '#f9c8d8'
};

export const MOODS = [
  'Sparkly', 'Cozy', 'Builder', 'Business Boss', 'Heist Crew',
  'Tech Sorceress', 'Science', 'Puppy/Twix', 'Surprise Me'
];
