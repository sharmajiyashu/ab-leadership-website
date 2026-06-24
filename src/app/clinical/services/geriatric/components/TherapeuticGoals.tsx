import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticGoals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of older adults and geriatric populations through evidence-based therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Cognitive Stimulation & Memory Support</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Strengthen cognitive engagement, memory recall, attention, and language expression through structured creative and reflective activities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Emotional Regulation & Psychological Well-being</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Reduce symptoms of anxiety, depression, agitation, and emotional withdrawal by fostering positive affect, emotional expression, and psychological safety.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Relational Connection & Social Engagement</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Promote meaningful interpersonal connection, belonging, and relational dignity through shared creative experiences and group-based interaction.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧘</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Embodied Awareness & Functional Mobility</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Support body awareness, gentle movement, sensory integration, and present-moment engagement to enhance physical comfort and mind–body connection.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Identity Continuity & Sense of Self</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Preserve personal identity, self-worth, and continuity of self through life story work, creative expression, and validation of lived experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Life Review, Meaning & Legacy Formation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Facilitate life reflection, meaning-making, and legacy expression to support emotional integration, coherence, and dignity in later life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
