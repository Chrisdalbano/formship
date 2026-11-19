/**
 * The people of Formship Games. Public page data: a name goes here only after
 * that person has agreed to how they are named and what their role line says.
 */

export interface Member {
  name: string
  /** What they do at the studio, as a plain list. */
  role: string
}

export const TEAM: Member[] = [
  { name: "Christian D'Albano", role: 'Founder. Game design, gameplay programming, concept art and animation.' },
  { name: 'Nicholas Drabb', role: 'Creative direction, story and voice.' },
  { name: 'Elijah Doss', role: 'Creative direction, music and voice.' },
  { name: 'Alejandro Muguerza', role: 'Art direction, game art and concept art.' },
]
