import { Program } from '../types';

const flagship = '/communities/sub-services/senior-citizens/flagship';

export const programs: Program[] = [
  {
    id: 1,
    title: "Memory Weaving & Legacy Art",
    subtitle: "Scrapbooking, photo collage, and symbolic painting",
    description: "Supports reminiscence, honours life stories, and fosters pride, meaning, and continuity of identity.",
    image: `${flagship}/memory%20weaving.png`
  },
  {
    id: 2,
    title: "Melody & Memory Sessions",
    subtitle: "Group singing, familiar tunes, gentle instruments, and music-based games",
    description: "Stimulates long-term memory, reduces anxiety, and builds joyful social connection.",
    image: `${flagship}/Melody%20%26%20Memory%20Sessions.png`
  },
  {
    id: 3,
    title: "Gentle Movement & Breath-Based Practices",
    subtitle: "Chair yoga, guided movement, breath with music, and rhythmic gestures",
    description: "Supports circulation, relaxation, and embodied presence, adapted for varying mobility levels.",
    image: `${flagship}/Gentle%20Movement%20%26%20Breath-Based%20Practices.png`
  },
  {
    id: 4,
    title: "Creative Storytelling & Life Narratives",
    subtitle: "Oral histories, autobiographical art, poetry sharing, and memory prompts",
    description: "Strengthens identity, promotes emotional coherence, and nurtures empathy within groups.",
    image: `${flagship}/Creative%20Storytelling%20%26%20Life%20Narratives%20(1).png`
  },
  {
    id: 5,
    title: "Sensory Calm Corners",
    subtitle: "Use of textiles, aromatherapy, visual mandalas, and soft-touch art materials",
    description: "Helps regulate overstimulation, soothe agitation, and promote comfort, especially in advanced dementia.",
    image: `${flagship}/Sensory%20Calm%20Corners.png`
  },
  {
    id: 6,
    title: "Intergenerational Art Bridges",
    subtitle: "Collaborative creative projects with children, volunteers, or family members",
    description: "Builds belonging, emotional warmth, and purpose through shared creative exchange.",
    image: `${flagship}/Intergenerational.png`
  },
  {
    id: 7,
    title: "Therapeutic Clowning & Joy Encounters",
    subtitle: "Gentle humour, attuned presence, and playful rituals",
    description: "Uplifts mood, reduces loneliness, and brings moments of lightness and human connection.",
    image: `${flagship}/therapeutic.png`
  }
];
