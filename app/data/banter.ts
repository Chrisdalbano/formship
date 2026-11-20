/**
 * The words in the site's dialog boxes. Site copy, not game script: nothing here is
 * lore and nothing here is a line Cog says. Edit freely; each string is one box.
 */

/** Click Cog in the footer. One set is picked per visit, in order. */
export const COG_SETS: string[][] = [
  [
    'Cog guards this footer.',
    'Nothing has ever attacked it.',
    'He stays anyway.',
  ],
  [
    'Cog does not talk. He stares.',
    'Still staring.',
    'That is all the dialog there is. He will walk it off.',
  ],
  [
    'You found the knight.',
    'He would like you to play the alpha.',
    'He has been standing in it for a while.',
  ],
]

/** The page that is not there. */
export const LOST: string[] = [
  'This page is not here.',
  'Cog checked behind the wall. Nothing there either.',
  'The games are back the other way.',
]

/** Up, up, down, down, left, right, left, right, B, A. */
export const KONAMI = 'Cheat accepted. Nothing changed. He appreciates the effort.'

/** Stoking the camp fire on the home page. */
export const FIRE: string[] = [
  'The fire is fine.',
  'Still fine.',
  'You are going to burn the tool box.',
  'That is enough fire.',
]
