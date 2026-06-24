import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticFocusAreas() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of senior citizens through gentle, person-centred therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Cognitive Stimulation & Memory Support</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Supporting memory recall, attention, language, and cognitive engagement through meaningful, age-appropriate activities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Emotional Wellbeing & Mood Regulation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Reducing loneliness, isolation, agitation, and depressive symptoms through supportive expression and relational connection.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Dignity, Identity & Personal Legacy</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Honouring life experiences, wisdom, and identity by affirming dignity, self-worth, and personal narrative.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Social Connection & Belonging</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Strengthening relationships and community through shared activities, group engagement, and relational presence.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Physical Comfort, Mobility & Sensory Integration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Supporting gentle movement, bodily awareness, and sensory stimulation to enhance comfort and present-moment engagement.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Life Reflection, Meaning-Making & Intergenerational Connection</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Creating space for storytelling, reflection, and legacy-sharing to foster meaning, continuity, and connection across generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
