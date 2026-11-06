/**
 * Formship Games catalogue. Public facts only, sourced from the publish-safe
 * notes in CV-Vault/10-Portfolio/projects/. Rules for this file:
 * - no shipped-game counts and no jam framing;
 * - captions describe what is on screen, never how an image was made;
 * - no cover art that was generated (Runicorn uses its gameplay shot).
 */

export interface Shot {
  src: string
  alt: string
  width: number
  height: number
}

export interface PlayLink {
  label: string
  href: string
}

export interface Game {
  slug: string
  title: string
  /** One line for cards and meta descriptions. */
  logline: string
  status: string
  genre: string
  engine: string
  platforms: string
  credits: string
  cover: Shot
  shots: Shot[]
  /** Paragraphs for the game page. Plain text, one idea each. */
  story: string[]
  /** What is happening with the game now. */
  now: string[]
  play: PlayLink[]
}

const shot = (src: string, alt: string, width: number, height: number): Shot => ({ src, alt, width, height })

export const GAMES: Game[] = [
  {
    slug: 'spare-knight',
    title: 'Spare Knight',
    logline: 'A tactical roguelike where attacks never miss and the tension lives in your timing.',
    status: 'In development',
    genre: 'Tactical roguelike',
    engine: 'Phaser, Electron',
    platforms: 'Desktop, aimed at Steam. Alpha playable in the browser.',
    credits: "Direction, design, programming and painted characters by Christian D'Albano. Sound, voice and co-written lore by Nicholas Drabb.",
    cover: shot('/games/spare-knight/cover.webp', 'Spare Knight key art: the brush-lettered title with its gear over the Act 1 countryside', 1600, 1000),
    shots: [
      shot('/games/spare-knight/camp.webp', 'Wren and the knight at the camp fire between battles', 1600, 1214),
      shot('/games/spare-knight/combat-act2.webp', 'Act 2: the ruined walls on the cathedral approach', 1600, 800),
    ],
    story: [
      'An outdated knight protects the last human he has, in a world where the machines decided organic life is inefficient.',
      'Combat runs on a 6x6 isometric grid and speed sets the turn order. Attacks never miss and never roll damage. What you commit is what happens. The tension lives in timing instead: a reaction wheel asks you to hear a chime and choose when to strike or brace.',
      'Cog, Wren, the machines and the event illustrations are painted by hand. The painted cast is the reason the game exists, so the production pipeline is built to make drawing the only slow step.',
    ],
    now: [
      'The browser alpha on itch.io is the first version of the game, built in 13 days and rebuilt in July around a readable interface.',
      'The full game is being remade for desktop: resumable runs, a black-and-paper interface, joined terrain, illustrated scene transitions and a larger cast of stranger machines. It ships when the beta survives a clean-machine install.',
    ],
    play: [
      { label: 'Play the alpha on itch.io', href: 'https://chrisdbgames.itch.io/spare-knight' },
    ],
  },
  {
    slug: 'i-wont-be-abducted',
    title: "I Won't Be Abducted",
    logline: 'A boy defends his bedroom from a nightly alien invasion, in a tabletop game where the aliens are pieces and the hands are his.',
    status: 'Released',
    genre: 'Tabletop defense',
    engine: 'Godot 4',
    platforms: 'Browser on Wavedash and itch.io',
    credits: "Design, direction, programming and hand-drawn standees by Christian D'Albano.",
    cover: shot('/games/i-wont-be-abducted/cover.webp', 'Key art: the boy stands his ground in the bedroom doorway', 1600, 1010),
    shots: [
      shot('/games/i-wont-be-abducted/placement-2026-09.webp', 'Night four, fight paused: legal cells glow green while a tin can is placed beside the boy and two aliens', 1600, 900),
      shot('/games/i-wont-be-abducted/boss-entrance-2026-09.webp', "The final night's entrance: a giant hand lowers the boss onto the board", 1280, 720),
      shot('/games/i-wont-be-abducted/workbench-2026-09.webp', 'The workbench: three illustrated recipes with coin costs', 1280, 720),
      shot('/games/i-wont-be-abducted/preview-chars.webp', 'Papercraft standees: the boy and the alien pieces', 1600, 900),
    ],
    story: [
      'A boy refuses to leave his room and defends it across four nights. You charge and kick pieces off the board through the door and windows, build tools at a workbench, and pick one upgrade at dawn.',
      "The ending pulls the camera back to show who has been moving the pieces.",
      "The player's kit never changes. Every number that makes a night harder lives in data, so the difficulty curve is a set of dials instead of new mechanics.",
    ],
    now: [
      'The September update made the game readable: a placement flow that stopped eating clicks, boss instructions moved onto the board above his head, and an economy that stopped giving tools away.',
    ],
    play: [
      { label: 'Play on Wavedash', href: 'https://wavedash.com/games/i-won-t-be-abducted' },
      { label: 'itch.io', href: 'https://chrisdbgames.itch.io/i-wont-be-abducted' },
    ],
  },
  {
    slug: 'thunderbashers',
    title: 'ThunderBashers',
    logline: 'An arena brawler where spinning is your only verb: strike the storm ball, parry it, or get knocked out of the league.',
    status: 'Released, online rooms live',
    genre: 'Arena brawler',
    engine: 'Unity 6',
    platforms: 'Browser on Wavedash and itch.io, Windows',
    credits: "Design, direction, programming, bot behaviour and feel tuning by Christian D'Albano.",
    cover: shot('/games/thunderbashers/cover.webp', 'ThunderBashers key art: the broadcast-style league lockup over a floodlit storm pit', 1600, 900),
    shots: [
      shot('/games/thunderbashers/v11-match.webp', 'A match: three robots with nameplates on the pit floor, the ball between them', 1347, 626),
      shot('/games/thunderbashers/garage.webp', 'The Garage: name your robot, pick colours and place stickers on a live preview', 1600, 900),
      shot('/games/thunderbashers/online-room.webp', 'An online room: two ready operators, chat, room settings and the start button', 1600, 900),
      shot('/games/thunderbashers/arena-diamond.webp', 'The original build: hand-drawn robots circle the thunder-ball in The Diamond arena', 957, 634),
    ],
    story: [
      'Robots in a circular pit bash a storm-charged ball at each other. Spinning is the whole kit: it strikes the ball, parries an incoming hit, and shoves a rival in close. If the ball catches you while you are not spinning, you are out.',
      'The rule that took longest was the one that sounded easiest: the ball kills you. It only felt fair once the ball showed its own danger with a heat tint.',
      'Five bot personalities, each a profile for reaction time, aim and nerve, fill a three-arena campaign.',
    ],
    now: [
      'Version 1.1 rebuilt the look around a league identity, with seven dressed arenas, announcer lines and a strike-feel pass.',
      'Online rooms followed: decorate your robot in the Garage, open a public or password room, and fight up to three other operators with bots filling empty seats.',
    ],
    play: [
      { label: 'Play on Wavedash', href: 'https://wavedash.com/games/thunder-bashers' },
      { label: 'itch.io', href: 'https://chrisdbgames.itch.io/thunderbashers' },
    ],
  },
]

/** Smaller releases, listed without their own page. */
export interface Release {
  title: string
  logline: string
  engine: string
  href: string
  image: Shot
}

export const RELEASES: Release[] = [
  {
    title: 'Undead Signal',
    logline: 'A zombie card roguelike where the horde forms poker hands and every move you have takes their hand apart.',
    engine: 'Unity 6, browser',
    href: 'https://wavedash.com/games/undead-signal',
    image: shot('/games/undead-signal/table-board.webp', "The Survivor's Table: the horde's hand on a paper note beside five zombie cards", 1600, 900),
  },
  {
    title: 'Runicorn Zombie Apocalypse',
    logline: 'The last colorful unicorn in a gray city. Close rainbow loops around the horde. The whole game fits in 13 kilobytes.',
    engine: 'JavaScript and Canvas, browser',
    href: 'https://chrisdalbano.com/games/runicorn-zombie-apocalypse/',
    image: shot('/games/runicorn/gameplay.webp', 'A rainbow loop closes around zombie unicorns in a dark city arena', 1280, 800),
  },
]

export const gameBySlug = (slug: string) => GAMES.find(g => g.slug === slug)
