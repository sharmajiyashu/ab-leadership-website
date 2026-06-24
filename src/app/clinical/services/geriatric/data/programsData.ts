import { TherapeuticProgram } from '../types';

const flagship = '/clinical/sub-services/geriatric/flagship';

export const therapeuticPrograms: TherapeuticProgram[] = [
  {
    id: 1,
    title: "Memory & Reminiscence Art Programs",
    subtitle: "Collage, painting, and photo-based creative projects",
    description: "Helps evoke long-term memories, encourage storytelling, and foster identity continuity",
    image: `${flagship}/Memory%20%26%20Reminiscence%20Art%20Programs.png`
  },
  {
    id: 2,
    title: "Music & Joy Therapy",
    subtitle: "Use of familiar songs, rhythm instruments, humming, and singing circles",
    description: "Triggers emotional memory, builds connection, and uplifts mood through musical nostalgia",
    image: `${flagship}/Music%20%26%20Joy%20Therapy.png`
  },
  {
    id: 3,
    title: "Therapeutic Clowning & Presence-Based Work",
    subtitle: "Use of gentle humor, eye contact, playfulness, and non-verbal attunement",
    description: "Supports emotional engagement, relational warmth, and reduces withdrawal or apathy",
    image: `${flagship}/therapeutic.png`
  },
  {
    id: 4,
    title: "Gentle Movement & Rhythm Sessions",
    subtitle: "Slow, adaptive movement combined with soft music and rhythm games",
    description: "Promotes physical mobility, reduces restlessness, and supports body-mind integration",
    image: `${flagship}/Gentle%20Movement%20%26%20Rhythm%20Sessions.png`
  },
  {
    id: 5,
    title: "Sensory Stimulation & Grounding Activities",
    subtitle: "Incorporation of textured fabrics, aromatherapy, soft lighting, and touch-based tools",
    description: "Enhances calm, orientation, and engagement, especially in advanced cognitive decline",
    image: `${flagship}/Sensory%20Stimulation%20%26%20Grounding%20Activities.png`
  },
  {
    id: 6,
    title: "Life Story & Legacy Projects",
    subtitle: "Facilitated creative storytelling, visual biographies, poetry, and memory books",
    description: "Supports dignity, reflection, and coherent closure in end-of-life and palliative contexts",
    image: `${flagship}/Life%20Story%20%26%20Legacy%20Projects.png`
  }
];
